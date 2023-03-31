import { FastifyInstance } from 'fastify';
import { fromArray } from '../../../helpers/from-array';
import { countriesList } from '../../../countries';

export default async function (fastify: FastifyInstance) {
  fastify.get('/countries', fromArray(countriesList));
}
