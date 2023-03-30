import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { filter, from, skip, take, toArray } from 'rxjs';
import { langsList } from '../../../langs';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/langs',
    async (request: FastifyRequest, reply: FastifyReply) => {
      let langs$ = from(langsList);

      // getting query params
      const searchString = request.query['search'];
      const pageNumber = Number(request.query['page-number']) || 1;
      const pageSize = Number(request.query['page-size']) || 10;
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

      // handling page number
      langs$ = langs$.pipe(skip(pageNumber * pageSize));
      // ---

      // limiting amount of entities
      langs$ = langs$.pipe(take(pageSize));
      // ---

      const result = await langs$.pipe(toArray()).toPromise();
      return result;
    }
  );
}