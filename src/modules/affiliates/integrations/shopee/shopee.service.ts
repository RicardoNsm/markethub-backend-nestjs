import { Injectable, InternalServerErrorException } from '@nestjs/common'

import axios from 'axios'

import { createHash } from 'crypto'

@Injectable()
export class ShopeeService {

  async generateAffiliateLink(productUrl: string, trackingId: string) {
    const appId = process.env.SHOPEE_APP_ID
    const secret = process.env.SHOPEE_SECRET
    const apiUrl = process.env.SHOPEE_API_URL ?? process.env.SHOPEE_BASE_URL

    if (!appId || !secret || !apiUrl) {
      throw new InternalServerErrorException('Credenciais da Shopee não configuradas.')
    }

    const query = `
    mutation GenerateShortLink(
        $originUrl: String!
        $subIds: [String!]
    ) {
        generateShortLink(
        input: {
            originUrl: $originUrl
            subIds: $subIds
        }
        ) {
        shortLink
        }
    }
    `;

    const variables = {
      originUrl: productUrl,
      subIds: [trackingId],
    }

    const payload = {
      query,
      variables,
    }

    const body = JSON.stringify(payload)

    const timestamp = Math.floor(Date.now() / 1000)

    const signature = createHash('sha256')
      .update(appId + String(timestamp) + body + secret)
      .digest('hex')

    const authorization =
      `SHA256 Credential=${appId}, ` + `Timestamp=${timestamp}, ` + `Signature=${signature}`

    const response = await axios.post(apiUrl, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
    })

        if (response.data?.errors) {
    console.error(
        'Erro GraphQL Shopee:',
        JSON.stringify(response.data.errors, null, 2),
    );

    throw new InternalServerErrorException(
        'A Shopee retornou um erro ao gerar o link afiliado.',
    );
    }

    const affiliateUrl = response.data?.data?.generateShortLink?.shortLink

    return  {
      affiliateUrl,
      trackingId,
    }
  }

  
  async getConversions(startDate: Date, endDate: Date) {
  const appId = process.env.SHOPEE_APP_ID;
  const secret = process.env.SHOPEE_SECRET;
  const apiUrl = process.env.SHOPEE_API_URL ?? process.env.SHOPEE_BASE_URL;

  if (!appId || !secret || !apiUrl) {
    throw new Error('Credenciais da Shopee não configuradas');
  }

  // Converte as datas para Unix Timestamp (segundos)
  const start = Math.floor(startDate.getTime() / 1000);
  const end = Math.floor(endDate.getTime() / 1000);

  // Consulta GraphQL
  const query = `
    {
      conversionReport(
        purchaseTimeStart: ${start},
        purchaseTimeEnd: ${end},
        limit: 50
      ) {
        nodes {
          purchaseTime
          clickTime
          conversionId
          totalCommission
          utmContent
          orders {
            orderId
            orderStatus
            items {
              itemId
              itemName
              itemPrice
              qty
              itemTotalCommission
            }
          }
        }
        pageInfo {
          limit
          hasNextPage
          scrollId
        }
      }
    }
  `;

  const payload = JSON.stringify({ query });

  // Gera a assinatura de autenticação
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const signature = createHash('sha256')
    .update(appId + timestamp + payload + secret)
    .digest('hex');

  const authorization = `SHA256 Credential=${appId}, Timestamp=${timestamp}, Signature=${signature}`;

  // Faz a requisição para a Shopee
  const response = await axios.post(
    apiUrl,
    payload,
    {
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
    },
  );

  // Verifica erros retornados pelo GraphQL
  if (response.data.errors?.length) {
    throw new Error(
      `Erro na API Shopee: ${response.data.errors[0].message}`,
    );
  }

  return response.data.data.conversionReport;
}
}
