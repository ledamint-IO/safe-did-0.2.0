import * as DID from '@identity.com/sol-did-client';
import { DeactivateRequest, DeactivateState } from './DefaultService';

export const deactivate = async (
  request: DeactivateRequest
): Promise<DeactivateState> => {
  const owner = request.secret.owner;
  const payer = request.secret.payer || owner || process.env.PAYER;
  if (!payer)
    throw new Error('Missing payer information- add a request secret');

  await DID.deactivate({
    owner,
    payer,
    did: request.identifier,
  });

  return {
    didState: {
      state: 'finished',
    },
  };
};
