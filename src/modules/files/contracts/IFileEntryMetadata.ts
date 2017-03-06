import { IDerivedEntry, IUserInfo } from 'modules/files/contracts';


export interface IFileEntryMetadata {
    derivedEntries?: IDerivedEntry[],
    description?: string,
    fileExtension?: string,
    fileName?: string,
    fileSize?: string,
    height?: string,
    metaData?: string,
    ownerUser?: IUserInfo,
    ownerUserID?: string,
    path: string,
    width?: number
}