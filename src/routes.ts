
import { Router } from 'express';

import UserRoutes from './users/user.route';

const route = Router();

route.use('/users', UserRoutes);

export default route;
