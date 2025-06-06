/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { useStyles } from './styles';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { PrimaryButton } from '@/components';
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { useTranslation } from '@/translation';
import { useConnectWallet } from '@web3-onboard/react';

export interface ConnectWalletBannerUiProps {
  isWalletConnected: boolean;
  openAuthModal: () => void;
}

export const ConnectWalletBannerUi: React.FC<ConnectWalletBannerUiProps> = ({
  isWalletConnected,
  openAuthModal,
  ...containerProps
}) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  if (isWalletConnected) {
    return null;
  }

  return (
    <Paper
      css={styles.container}
      {...containerProps}
      className='connect-wallet-card-wrap'
    >
      <div css={styles.content}>
        <Typography variant='h1' css={styles.title}>
          Connect polygon network
        </Typography>

        <Typography css={styles.description}>
          A test to connect to polygon network by default.
        </Typography>

        <PrimaryButton
          css={styles.button}
          onClick={wallet ? openAuthModal : async () => await connect()}
          className='custom-btn-wrap'
        >
          {t('dashboard.connectWalletBanner.buttonLabel')}
        </PrimaryButton>
      </div>

      {/* <div css={styles.illustrationContainer}>
        <img
          src={illustration}
          css={styles.illustration}
          alt={t("dashboard.connectWalletBanner.illustration.alt")}
        />
      </div> */}
    </Paper>
  );
};

const ConnectWalletBanner: React.FC = () => {
  const { accountAddress, openAuthModal } = useAuth();

  return (
    <ConnectWalletBannerUi
      isWalletConnected={!!accountAddress}
      openAuthModal={openAuthModal}
    />
  );
};

export default ConnectWalletBanner;
