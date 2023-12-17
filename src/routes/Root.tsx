import { Button } from '@linearb/linui-common';
import { Link } from 'react-router-dom';

export function Root() {
  return (
    <nav>
      <Button LinkComponent={Link} to='/about' variant='contained'>
        About
      </Button>
      <Button LinkComponent={Link} to='/help' variant='outlined'>
        Help
      </Button>
    </nav>
  );
}
