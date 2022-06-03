import axios from 'axios';
import base64 from 'js-base64';
import config from '../../config';
import Author from '../../types/Author';
import GetCommentsResponse from '../../types/GetCommentsResponse';
import GetPostResponse from '../../types/GetPostResponse';
import LatestComment from '../../types/LatestComment';
import Photo from '../../types/Photo';

interface BaseResponse {
  result_code: 1;
}

interface AuthedResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  user_key: string;
}

interface GetBandsResponse extends BaseResponse {
  result_data: {
    bands: { name: string; cover: string; member_count: number; band_key: string }[];
  };
}

interface GetPostsResponse extends BaseResponse {
  result_data: {
    items: {
      author: Author;
      post_key: string;
      content: string;
      comment_count: number;
      created_at: number;
      photos: Photo[];
      emotion_count: number;
      latest_comments: LatestComment[];
      band_key: string;
    }[];
    paging: {
      previous_params: null;
      next_params: { access_token: string; band_key: string; limit: string; after: string };
    };
  };
}

class BandWrapper {
  client = axios.create();

  async getAuthCode() {
    const res = await this.client.get('https://auth.band.us/oauth2/authorize', {
      params: {
        response_type: 'code',
        client_id: '350254930',
        redirect_uri: `${config.serveUrl}/api/authedForBand`,
      },
    });
    return res.request.res.responseUrl as string;
  }

  async getToken(code: string): Promise<AuthedResponse> {
    const based = base64.encode(`${config.clientId}:${config.clientSecret}`);
    const { data } = await this.client.get('https://auth.band.us/oauth2/token', {
      params: { code, grant_type: 'authorization_code' },
      headers: { Authorization: `Basic ${based}` },
    });
    return data;
  }

  async getBands(token: string): Promise<GetBandsResponse> {
    const { data } = await this.client.get('https://openapi.band.us/v2.1/bands', {
      params: { access_token: token },
    });
    return data;
  }

  async getPosts(props: {
    token: string;
    bandKey: string;
    locale: string;
  }): Promise<GetPostsResponse> {
    const { data } = await this.client.get('https://openapi.band.us/v2/band/posts', {
      params: { access_token: props.token, band_key: props.bandKey, locale: props.locale },
    });
    return data;
  }

  async getPost(props: { token: string; bandKey: string; postKey: string }) {
    const { data } = await this.client.get<GetPostResponse>(
      'https://openapi.band.us/v2.1/band/post',
      {
        params: { access_token: props.token, band_key: props.bandKey, post_key: props.postKey },
      },
    );
    return data;
  }

  async getComments(props: {
    token: string;
    bandKey: string;
    postKey: string;
    sort?: '+created_at' | '-created_at';
  }) {
    const { data } = await this.client.get<GetCommentsResponse>(
      'https://openapi.band.us/v2/band/post/comments',
      {
        params: {
          access_token: props.token,
          band_key: props.bandKey,
          post_key: props.postKey,
          sort: props.sort,
        },
      },
    );
    return data;
  }

  async writeComment(props: { token: string; bandKey: string; postKey: string; body: string }) {
    const { data } = await this.client.post(
      'https://openapi.band.us/v2/band/post/comment/create',
      {},
      {
        params: {
          access_token: props.token,
          band_key: props.bandKey,
          post_key: props.postKey,
          body: props.body,
        },
      },
    );
    return data;
  }
}

export default new BandWrapper();
