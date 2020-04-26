import { AppStorage } from './app-storage.service';

// in-memory authorization cache
let authorization: {
  refreshToken: string,
  accessToken: string,
};

async function loadAuthorization() {
  const auth = await AppStorage.getAuthorization();
  authorization = auth ? JSON.parse(auth) : {};
}

function saveAuthorization(): Promise<void> {
  const auth = JSON.stringify(authorization);
  return AppStorage.setAuthorization(auth);
}

export class TokenStore {
  static async getRefreshToken(): Promise<string> {
    if (!authorization) await loadAuthorization();
    return authorization.refreshToken;
  }

  static async setRefreshToken(token: string): Promise<void> {
    if (!authorization) await loadAuthorization();
    authorization.refreshToken = token;
    await saveAuthorization();
  }

  static async getAccessToken(): Promise<string> {
    if (!authorization) await loadAuthorization();
    return authorization.accessToken;
  }

  static async setAccessToken(token: string): Promise<void> {
    if (!authorization) await loadAuthorization();
    authorization.accessToken = token;
    await saveAuthorization();
  }
}
