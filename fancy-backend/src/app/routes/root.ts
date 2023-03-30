import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {langs} from "../../langs";

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/',
    async function (request: FastifyRequest, reply: FastifyReply) {
      return { message: 'Hello API' };
    }
  );

  fastify.get(
    '/langs',
    async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(request.query);

      return langs;
    }
  )
}
