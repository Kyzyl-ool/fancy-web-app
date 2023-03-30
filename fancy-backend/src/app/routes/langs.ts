import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { filter, from, skip, take, toArray } from 'rxjs';
import { langsList } from '../../langs';

const LIMIT = 20;

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/langs',
    async (request: FastifyRequest, reply: FastifyReply) => {
      let langs$ = from(langsList);

      // getting query params
      const searchString = request.query['search'];
      const skipAmount = Number(request.query['skip']);
      // ---

      // handling search string
      if (searchString) {
        langs$ = langs$.pipe(
          filter(
            ({ key, label }) =>
              key.includes(searchString) ||
              label.toLowerCase().includes(searchString)
          )
        );
      }
      // ---

      // handling skip
      if (skipAmount) {
        langs$ = langs$.pipe(skip(skipAmount));
      }
      // ---

      // limiting amount of entities
      langs$ = langs$.pipe(take(LIMIT));
      // ---

      const result = await langs$.pipe(toArray()).toPromise();
      return result;
    }
  );
}
