import type { Repository } from 'typeorm';

export class BaseService<T> {
  constructor(private repository: Repository<T>) { }

  find(...params: Parameters<typeof this.repository.find>) {
    return this.repository.find(...params);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(...params: Parameters<typeof this.repository.findOne>) {
    return this.repository.findOne(...params);
  }

  save(...params: Parameters<typeof this.repository.save>) {
    return this.repository.save(...params);
  }

  insert(...params: Parameters<typeof this.repository.insert>) {
    return this.repository.insert(...params);
  }

  update(...params: Parameters<typeof this.repository.update>) {
    return this.repository.update(...params);
  }

  delete(...params: Parameters<typeof this.repository.delete>) {
    return this.repository.delete(...params);
  }

  clear(...params: Parameters<typeof this.repository.clear>) {
    return this.repository.clear(...params);
  }

  createQueryBuilder(...params: Parameters<typeof this.repository.createQueryBuilder>) {
    return this.repository.createQueryBuilder(...params);
  }
}
