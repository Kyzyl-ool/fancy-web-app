import { FastifyReply, FastifyRequest } from 'fastify';
import { filter, from, skip, take, toArray } from 'rxjs';

interface ArrayItem {
  key: string;
  label: string;
}

export const fromArray =
  (array: ArrayItem[]) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    let langs$ = from(array);

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
            label.toLowerCase().includes(searchString.toLowerCase())
        )
      );
    }
    // ---

    // handling page number
    langs$ = langs$.pipe(skip((pageNumber - 1) * pageSize));
    // ---

    // limiting amount of entities
    langs$ = langs$.pipe(take(pageSize));
    // ---

    const result = await langs$.pipe(toArray()).toPromise();
    return result;
  };
