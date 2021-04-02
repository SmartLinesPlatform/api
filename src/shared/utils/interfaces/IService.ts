export default interface IService<T, DTO> {
  execute(data: DTO): Promise<T>;
}
