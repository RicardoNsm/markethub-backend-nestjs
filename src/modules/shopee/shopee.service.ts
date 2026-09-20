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

  async getConversions() {
    
  }
}
