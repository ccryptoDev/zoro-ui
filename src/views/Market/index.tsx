/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import Card, { CardProps } from './Card';
import MarketInfo, { MarketInfoProps } from './MarketInfo';
import { useStyles } from './styles';
import TEST_IDS from './testIds';
import useGetChartData from './useGetChartData';
import { Paper } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useGetAsset, useGetVTokenApySimulations } from '@/clients/api';
import {
  ApyChart,
  ApyChartProps,
  Button,
  InterestRateChart,
  InterestRateChartProps,
  SecondaryButton,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d792741 (fix the decimals)
  Spinner
} from 'components'
import { COMPOUND_MANTISSA } from 'constants/compoundMantissa'
import PLACEHOLDER_KEY from 'constants/placeholderKey'
import { routes } from 'constants/routing'
import { TOKENS } from 'constants/tokens'
import { BLOCKS_PER_DAY } from 'constants/zk'
<<<<<<< HEAD
=======
import { SECONDS_PER_DAY } from 'constants/zk'
>>>>>>> d792741 (fix the decimals)
import { useAuth } from 'context/AuthContext'
import { useHideXlDownCss, useShowXlDownCss } from 'hooks/responsive'
import useOperationModal from 'hooks/useOperationModal'
import React, { useMemo } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'translation'
import { Asset } from 'types'
<<<<<<< HEAD
=======
  Spinner,
} from "components";
import { COMPOUND_MANTISSA } from "constants/compoundMantissa";
import PLACEHOLDER_KEY from "constants/placeholderKey";
import { routes } from "constants/routing";
import { TOKENS } from "constants/tokens";
import { BLOCKS_PER_DAY } from "constants/zk";
import { SECONDS_PER_DAY } from "constants/zk";
import { useAuth } from "context/AuthContext";
import { useHideXlDownCss, useShowXlDownCss } from "hooks/responsive";
import useOperationModal from "hooks/useOperationModal";
import React, { useMemo } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { useTranslation } from "translation";
import { Asset } from "types";
>>>>>>> 92097fc (blocks per day)
=======
>>>>>>> d792741 (fix the decimals)
=======
  Spinner,
} from '@/components';
import { COMPOUND_MANTISSA } from '@/constants/compoundMantissa';
import PLACEHOLDER_KEY from '@/constants/placeholderKey';
import { routes } from '@/constants/routing';
import { TOKENS } from '@/constants/tokens';
import { BLOCKS_PER_DAY } from '@/constants/zk';
import { SECONDS_PER_DAY } from '@/constants/zk';
import { useAuth } from '@/context/AuthContext';
import { useHideXlDownCss, useShowXlDownCss } from '@/hooks/responsive';
import useOperationModal from '@/hooks/useOperationModal';
import React, { useMemo } from 'react';
// import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from '@/translation';
import { Asset } from '@/types';
>>>>>>> 2df7027 (first steps, render dashboard)
import {
  areAddressesEqual,
  formatCentsToReadableValue,
  formatToReadablePercentage,
  formatTokensToReadableValue,
  getContractAddress,
  getVTokenByAddress,
  isTokenActionEnabled,
} from '@/utilities';

export interface MarketUiProps {
  isChartDataLoading: boolean;
  supplyChartData: ApyChartProps['data'];
  borrowChartData: ApyChartProps['data'];
  interestRateChartData: InterestRateChartProps['data'];
  isInterestRateChartDataLoading: boolean;
  poolComptrollerAddress: string;
  asset?: Asset;
}

export const MarketUi: React.FC<MarketUiProps> = ({
  asset,
  isChartDataLoading,
  poolComptrollerAddress,
  supplyChartData,
  borrowChartData,
  isInterestRateChartDataLoading,
  interestRateChartData,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const hideXlDownCss = useHideXlDownCss();
  const showXlDownCss = useShowXlDownCss();

  const { openOperationModal, OperationModal } = useOperationModal();

  const {
    currentUtilizationRate,
    dailySupplyInterestsCents,
    dailyBorrowInterestsCents,
  } = useMemo(
    () => ({
      currentUtilizationRate:
        asset &&
        asset.borrowBalanceTokens
          .div(
            asset.cashTokens
              .plus(asset.borrowBalanceTokens)
              .minus(asset.reserveTokens)
          )
          .multipliedBy(100)
          .dp(0)
          .toNumber(),
      // Calculate daily interests for suppliers and borrowers. Note that we don't
      // use BigNumber to calculate these values, as this would slow down
      // calculation a lot while the end result doesn't need to be extremely
      // precise

      // prettier-ignore
      dailySupplyInterestsCents: asset && +asset.supplyBalanceCents * (((1 + asset.supplyRatePerBlockTokens.toNumber()) ** SECONDS_PER_DAY) - 1),
      // prettier-ignore
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      dailyBorrowInterestsCents: asset && +asset.borrowBalanceCents * (((1 + asset.borrowRatePerBlockTokens.toNumber()) ** BLOCKS_PER_DAY) - 1)
=======
      dailyBorrowInterestsCents: asset && +asset.borrowBalanceCents * (((1 + asset.borrowRatePerBlockTokens.toNumber()) ** SECONDS_PER_DAY) - 1),
>>>>>>> 92097fc (blocks per day)
=======
      dailyBorrowInterestsCents: asset && +asset.borrowBalanceCents * (((1 + asset.borrowRatePerBlockTokens.toNumber()) ** SECONDS_PER_DAY) - 1)
>>>>>>> d792741 (fix the decimals)
=======
      dailyBorrowInterestsCents: asset && +asset.borrowBalanceCents * (((1 + asset.borrowRatePerBlockTokens.toNumber()) ** SECONDS_PER_DAY) - 1),
>>>>>>> 2df7027 (first steps, render dashboard)
    }),
    [
      asset?.supplyRatePerBlockTokens,
      asset?.supplyBalanceCents,
      asset?.borrowRatePerBlockTokens,
      asset?.borrowRatePerBlockTokens,
    ]
  );

  const isSupplyOrBorrowEnabled = React.useMemo(
    () =>
      asset &&
      (isTokenActionEnabled({
        token: asset.vToken.underlyingToken,
        action: 'supply',
      }) ||
        isTokenActionEnabled({
          token: asset.vToken.underlyingToken,
          action: 'borrow',
        })),
    [asset?.vToken.underlyingToken]
  );

  const supplyInfoStats: CardProps['stats'] = React.useMemo(
    () =>
      asset
        ? [
            {
              label: t('market.supplyInfo.stats.totalSupply'),
              value: formatCentsToReadableValue({
                value: asset.supplyBalanceCents,
              }),
            },
            {
              label: t('market.supplyInfo.stats.apy'),
              value: formatToReadablePercentage(
                Math.abs(asset?.supplyApyPercentage as unknown as number)
              ),
            },
            {
              label: t('market.supplyInfo.stats.distributionApy'),
              value: formatToReadablePercentage(
                asset.distributions.reduce(
                  (acc: any, distribution: any) =>
                    acc.plus(distribution.supplyApyPercentage),
                  new BigNumber(0)
                )
              ),
            },
          ]
        : [],
    [
      asset?.supplyApyPercentage,
      asset?.supplyApyPercentage,
      asset?.distributions,
    ]
  );

  const supplyInfoLegends: CardProps['legends'] = [
    {
      label: t('market.legends.supplyApy'),
      color: styles.legendColors.supplyApy,
    },
  ];

  const borrowInfoStats: CardProps['stats'] = React.useMemo(
    () =>
      asset
        ? [
            {
              label: t('market.borrowInfo.stats.totalBorrow'),
              value: formatCentsToReadableValue({
                value: asset.borrowBalanceCents,
              }),
            },
            {
              label: t('market.borrowInfo.stats.apy'),
              value: formatToReadablePercentage(
                Math.abs(asset.borrowApyPercentage as unknown as number)
              ),
            },
            {
              label: t('market.borrowInfo.stats.distributionApy'),
              value: formatToReadablePercentage(
                asset.distributions.reduce(
                  (acc: any, distribution: any) =>
                    acc.plus(distribution.borrowApyPercentage),
                  new BigNumber(0)
                )
              ),
            },
          ]
        : [],
    [
      asset?.borrowBalanceCents,
      asset?.borrowApyPercentage,
      asset?.distributions,
    ]
  );

  const borrowInfoLegends: CardProps['legends'] = [
    {
      label: t('market.legends.borrowApy'),
      color: styles.legendColors.borrowApy,
    },
  ];

  const interestRateModelLegends: CardProps['legends'] = [
    {
      label: t('market.legends.utilizationRate'),
      color: styles.legendColors.utilizationRate,
    },
    {
      label: t('market.legends.borrowApy'),
      color: styles.legendColors.borrowApy,
    },
    {
      label: t('market.legends.supplyApy'),
      color: styles.legendColors.supplyApy,
    },
  ];

  const marketInfoStats: MarketInfoProps['stats'] = React.useMemo(() => {
    if (!asset) {
      return [];
    }

    const distributionRows = asset.distributions.map((distribution: any) => ({
      label: t('market.marketInfo.stats.dailyDistribution', {
        tokenSymbol: distribution.token.symbol,
      }),
      value: formatTokensToReadableValue({
        value: distribution.dailyDistributedTokens,
        addSymbol: false,
        token: (TOKENS as any).xvs,
      }),
    }));

    return [
      {
        label: t('market.marketInfo.stats.priceLabel'),
        value: asset.tokenPriceCents
          ? formatCentsToReadableValue({
              value: asset.tokenPriceCents,
              isTokenPrice: true,
            })
          : PLACEHOLDER_KEY,
      },
      {
        label: t('market.marketInfo.stats.marketLiquidityLabel'),
        value: formatCentsToReadableValue({
          value: asset.liquidityCents,
        }),
      },
      //{
      //label: t('market.marketInfo.stats.supplierCountLabel'),
      //value: asset.supplierCount ?? '-',
      //},
      //{
      //label: t('market.marketInfo.stats.borrowerCountLabel'),
      //value: asset.borrowerCount ?? '-',
      //},
      //{
      //label: t('market.marketInfo.stats.supplyCapLabel'),
      //value: !asset.supplyCapTokens
      //? t('market.marketInfo.stats.unlimitedSupplyCap')
      //: formatTokensToReadableValue({
      //value: asset.supplyCapTokens,
      //token: asset.vToken.underlyingToken,
      //}),
      //},
      {
        label: t('market.marketInfo.stats.borrowCapLabel'),
        value: !asset.borrowCapTokens
          ? t('market.marketInfo.stats.unlimitedBorrowCap')
          : formatTokensToReadableValue({
              value: asset.borrowCapTokens,
              token: asset.vToken.underlyingToken,
            }),
      },
      {
        label: t('market.marketInfo.stats.dailySupplyingInterestsLabel'),
        value: formatCentsToReadableValue({
          value: dailySupplyInterestsCents,
        }),
      },
      {
        label: t('market.marketInfo.stats.dailyBorrowingInterestsLabel'),
        value: formatCentsToReadableValue({
          value: dailyBorrowInterestsCents,
        }),
      },
      ...distributionRows,
      {
        label: t('market.marketInfo.stats.reserveTokensLabel'),
        value: formatTokensToReadableValue({
          value: asset.reserveTokens,
          token: asset.vToken.underlyingToken,
        }),
      },
      {
        label: t('market.marketInfo.stats.reserveFactorLabel'),
        value: formatToReadablePercentage(
          asset.reserveFactor && asset.reserveFactor * 100
        ),
      },
      {
        label: t('market.marketInfo.stats.collateralFactorLabel'),
        value: formatToReadablePercentage(
          asset.collateralFactor && asset.collateralFactor * 100
        ),
      },
      {
        label: t('market.marketInfo.stats.mintedTokensLabel', {
          vTokenSymbol: asset.vToken.symbol,
        }),
        value: formatTokensToReadableValue({
          value: asset.supplyBalanceTokens.multipliedBy(
            asset.exchangeRateVTokens
          ),
          addSymbol: false,
          token: asset.vToken,
        }),
      },
      {
        label: t('market.marketInfo.stats.exchangeRateLabel'),
        value: asset.exchangeRateVTokens
          ? t('market.marketInfo.stats.exchangeRateValue', {
              tokenSymbol: asset.vToken.underlyingToken.symbol,
              vTokenSymbol: asset.vToken.symbol,
              rate: asset.exchangeRateVTokens.dp(6).toFixed(),
            })
          : PLACEHOLDER_KEY,
      },
    ];
  }, [
    asset?.tokenPriceCents,
    asset?.liquidityCents,
    asset?.supplierCount,
    asset?.borrowerCount,
    asset?.borrowCapTokens,
    asset?.vToken,
    asset?.distributions,
    asset?.reserveTokens,
    asset?.reserveFactor,
    asset?.collateralFactor,
    asset?.supplyBalanceTokens,
    asset?.exchangeRateVTokens,
    dailySupplyInterestsCents,
    dailyBorrowInterestsCents,
  ]);

  if (!asset) {
    return <Spinner />;
  }

  const buttonsDom = (
    <>
      {isTokenActionEnabled({
        token: asset.vToken.underlyingToken,
        action: 'supply',
      }) && (
        <Button
          fullWidth
          css={styles.statsColumnButton}
          onClick={() =>
            openOperationModal({
              vToken: asset.vToken,
              poolComptrollerAddress,
              initialActiveTabIndex: 0,
            })
          }
          className={'custom-btn-wrap'}
        >
          {t('market.supplyButtonLabel')}
        </Button>
      )}
      {isTokenActionEnabled({
        token: asset.vToken.underlyingToken,
        action: 'borrow',
      }) && (
        <SecondaryButton
          fullWidth
          css={styles.statsColumnButton}
          onClick={() =>
            openOperationModal({
              vToken: asset.vToken,
              poolComptrollerAddress,
              initialActiveTabIndex: 2,
            })
          }
          className={'custom-btn-wrap'}
        >
          {t('market.borrowButtonLabel')}
        </SecondaryButton>
      )}
    </>
  );

  return (
    <>
      <div css={styles.container}>
        {isSupplyOrBorrowEnabled && (
          <Paper css={[styles.statsColumnButtonContainer, showXlDownCss]}>
            {buttonsDom}
          </Paper>
        )}

        <div css={[styles.column, styles.graphsColumn]}>
          <Card
            testId={TEST_IDS.supplyInfo}
            title={t('market.supplyInfo.title')}
            css={styles.graphCard}
            stats={supplyInfoStats}
            legends={supplyInfoLegends}
          >
            {supplyChartData.length > 0 && (
              <div css={styles.apyChart}>
                <ApyChart data={supplyChartData} type='supply' />
              </div>
            )}
            {isChartDataLoading && supplyChartData.length === 0 && <Spinner />}
          </Card>
          <Card
            testId={TEST_IDS.borrowInfo}
            title={t('market.borrowInfo.title')}
            css={styles.graphCard}
            stats={borrowInfoStats}
            legends={borrowInfoLegends}
          >
            {isChartDataLoading && borrowChartData.length === 0 && <Spinner />}
            {borrowChartData.length > 0 && (
              <div css={styles.apyChart}>
                <ApyChart data={borrowChartData} type='borrow' />
              </div>
            )}
          </Card>

          <Card
            testId={TEST_IDS.interestRateModel}
            title={t('market.interestRateModel.title')}
            css={styles.graphCard}
            legends={interestRateModelLegends}
          >
            {isInterestRateChartDataLoading &&
              interestRateChartData.length === 0 && <Spinner />}
            {interestRateChartData.length > 0 && (
              <div css={styles.apyChart}>
                <InterestRateChart
                  data={interestRateChartData}
                  currentUtilizationRate={currentUtilizationRate}
                />
              </div>
            )}
          </Card>
        </div>

        <div css={[styles.column, styles.statsColumn]}>
          {isSupplyOrBorrowEnabled && (
            <Paper css={[styles.statsColumnButtonContainer, hideXlDownCss]}>
              {buttonsDom}
            </Paper>
          )}

          <MarketInfo stats={marketInfoStats} testId={TEST_IDS.marketInfo} />
        </div>
      </div>

      <OperationModal />
    </>
  );
};
