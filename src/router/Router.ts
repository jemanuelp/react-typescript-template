import { useRoutes } from 'react-router-dom';
import { Route } from '../domains/interfaces/Route';

interface RouterProps {
  allRoutes: Route[];
}

const Router = ({ allRoutes }: RouterProps) => {
  return useRoutes([...allRoutes]);
};

export default Router;
