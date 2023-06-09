import { FastifyInstance } from 'fastify';
import { langsList } from '../../../langs';
import { fromArray } from '../../../helpers/from-array';

export default async function (fastify: FastifyInstance) {
  fastify.get('/langs', fromArray(langsList));
}
