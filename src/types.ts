import { EntityManager, IDatabaseDriver, Connection } from "typeorm";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
}
