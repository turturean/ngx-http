import {HttpClient} from "@angular/common/http";

export type ArgumentTypes<F extends Function> = F extends (url: string, ...args: infer A) => any
  ? A
  : never;
export type ReturnWatchTypes<D> = {
  data: D;
  loading: boolean;
  err: null;
};

export type GetType = ArgumentTypes<typeof HttpClient.prototype.get>;
export type PostType = ArgumentTypes<typeof HttpClient.prototype.post>;
export type PutType = ArgumentTypes<typeof HttpClient.prototype.put>;
export type DeleteType = ArgumentTypes<typeof HttpClient.prototype.delete>;
export type PatchType = ArgumentTypes<typeof HttpClient.prototype.patch>;

export enum HttpMethod {
  Post,
  Get,
  Put,
  Delete,
  Patch
}
