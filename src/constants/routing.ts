import { isFeatureEnabled } from '@/utilities';

export enum Subdirectory {
  DASHBOARD = '/',
  ACCOUNT = '/account',
  //XVS = '/xvs',
  POOLS = '/pools',
  POOL = '/pool/:poolComptrollerAddress',
  MARKETS = '/markets/:poolComptrollerAddress',
  MARKET = '/market/:vTokenAddress',
  NOTFOUND = '/404',
  TEST = '/test',
  //HISTORY = '/history',
  //VAULTS = '/vaults',
  //GOVERNANCE = '/governance',
  //LEADER_BOARD = '/leaderboard',
  //PROPOSAL = '/proposal/:proposalId',
  //VOTER = '/voter/:address',
  //SWAP = '/swap',
  //CONVERT_VRT = '/convert-vrt',
  //VAI = '/vai',
}

const routeSubdirectories = {
  dashboard: [Subdirectory.DASHBOARD],
  account: [Subdirectory.ACCOUNT],
  //xvs: [Subdirectory.XVS],
  pools: [Subdirectory.POOLS],
  pool: [Subdirectory.POOLS, Subdirectory.POOL],
  markets: [Subdirectory.MARKETS],
  market: isFeatureEnabled('isolatedPools')
    ? [Subdirectory.POOLS, Subdirectory.POOL, Subdirectory.MARKET]
    : [Subdirectory.MARKETS, Subdirectory.MARKET],
  notfound: [Subdirectory.NOTFOUND],
  test: [Subdirectory.TEST],
  //governance: [Subdirectory.GOVERNANCE],
  //governanceProposal: [Subdirectory.GOVERNANCE, Subdirectory.PROPOSAL],
  //governanceLeaderBoard: [Subdirectory.GOVERNANCE, Subdirectory.LEADER_BOARD],
  //governanceVoter: [Subdirectory.GOVERNANCE, Subdirectory.VOTER],
  //history: [Subdirectory.HISTORY],
  //swap: [Subdirectory.SWAP],
  //convertVrt: [Subdirectory.CONVERT_VRT],
  //vaults: [Subdirectory.VAULTS],
  //vai: [Subdirectory.VAI],
};

type RouteName = keyof typeof routeSubdirectories;

export interface IRoute {
  path: string;
  subdirectories: Subdirectory[];
}

type Routes = {
  [key in RouteName]: IRoute;
};

export const routes = Object.keys(routeSubdirectories).reduce<Routes>(
  (obj, key) =>
    Object.prototype.hasOwnProperty.call(routeSubdirectories, key)
      ? {
          ...obj,
          [key]: {
            path: routeSubdirectories[key as RouteName].join(''),
            subdirectories: routeSubdirectories[key as RouteName],
          },
        }
      : obj,
  {} as Routes
);
