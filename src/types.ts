export type MyContext {
  em: Entitymanager<any> & EntityManager<IDatabaseDriver<connection>>
}
