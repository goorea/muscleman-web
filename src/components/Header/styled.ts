import { Link, styled } from '@mui/material';

export const StyledHeader = styled('header')(({ theme }) => ({
  padding: '10px 0',
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `1px solid ${theme.palette.info.main}`,
  position: 'sticky',
}));

export const HeaderWrapper = styled('div')({
  maxWidth: '1140px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
});

export const IconLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
});
