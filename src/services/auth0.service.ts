import { ManagementClient, AuthenticationClient } from 'auth0';

import { auth0Config } from '../config/auth0.config';

export const RequestPasswordChange = async (uid: string) => {
  // const auth = new AuthenticationClient({
  //   domain: auth0Config.auth0Domain,
  //   clientId: auth0Config.apiMngmtClientId,
  //   clientSecret: auth0Config.apiMngmtClientSecret,
  //   telemetry: false
  // });

  const auth0 = new ManagementClient({
    domain: auth0Config.auth0Domain,
    clientId: auth0Config.apiMngmtClientId,
    clientSecret: auth0Config.apiMngmtClientSecret,
    scope: 'read:users update:users create:user_tickets',
  });

  return await auth0.createPasswordChangeTicket({
    user_id: uid,
  });

  // const user = await auth0.getUser({ id: uid });

  // return await auth.requestChangePasswordEmail({
  //   email: 'ivan.soriano.gomez@gmail.com',
  //   client_id: auth0Config.apiMngmtClientId,
  //   connection: 'con_2',
  // });

  // return await auth.requestChangePasswordEmail({
  //   email: 'ivan.soriano.gomez@gmail.com',
  //   client_id: auth0Config.apiMngmtClientId,
  //   connection: 'con_2',
  // });

  // return await auth0.createPasswordChangeTicket({
  //   result_url: 'https://www.google.com',
  //   user_id: uid,
  // });
};
