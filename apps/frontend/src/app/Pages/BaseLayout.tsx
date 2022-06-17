import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';

const BaseLayout = () => {
  return (
    <div>
      <Grid
        templateAreas={`"header header"
            "main main"
            `}
        gridTemplateRows={'50px 1fr 30px'}
        gridTemplateColumns={'150px 1fr'}
        gap="3"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem area={'header'}>
          <Navbar />
        </GridItem>
        {/* <GridItem area={'nav'}>Nav</GridItem> */}
        <GridItem area={'main'} mt="3">
          <Outlet />
        </GridItem>
      </Grid>
    </div>
  );
};

export default BaseLayout;
