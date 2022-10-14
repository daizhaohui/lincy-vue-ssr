import { IExtensionContext, IGlobalData } from '~/lib/interface';

export interface IGlobalService {
  getData: (extensionContext: IExtensionContext) => Promise<IGlobalData | undefined>
}
