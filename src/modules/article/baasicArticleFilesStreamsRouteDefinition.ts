/* globals module */
/**  
 * @module baasicArticleFilesStreamsRouteDefinition  
 * @description Baasic Article Files Streams Route Definition provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Files Streams Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services. 
*/


import { injectable, inject } from "inversify";
import { BaasicBaseRouteDefinition } from 'common';
import { IOptions } from 'common/contracts';
import { IAppOptions, TYPES as coreTypes } from 'core/contracts';
import { IArticleFile } from 'modules/article/contracts';

@injectable()
export class BaasicArticleFilesStreamsRouteDefinition extends BaasicBaseRouteDefinition {

    constructor(
        @inject(coreTypes.IAppOptions) protected appOptions: IAppOptions
    ) { super(appOptions); }

    /**                     
     * Parses get route; this route should be expanded with id of desired file stream. Additional supported items are:                     
     * - `width` - width of desired derived image.  
     * - `height` - height of desired derived image. 
     * @method
     * @example baasicArticleFilesRouteDefinition.get({id: '<filename>'});
     **/
    get(data: any): any {
        if (!this.utility.isObject(data)) {
            data = {
                id: data
            };
        }
        return super.baseCreate('article-file-streams/{id}/{?width,height}', data);
    }

    /**                     
     * Parses create route; this route should be expanded with the filename which indicates where the stream will be saved.                     
     * @method 
     * @example baasicArticleFilesRouteDefinition.create({filename: '<filename>'});                                   
     **/
    create(data: IArticleFile): any {
        return super.baseCreate('article-file-streams/{filename}/{?articleId}', data);
    }

    /**                     
     * Parses update route; this route should be expanded with the id of the previously saved resource. Additional supported items are:                     
     * - `width` - width of derived image to update.                     
     * - `height` - height of derived image to update.                                        
     * @method                        
     * @example baasicArticleFilesRouteDefinition.update({id: '<filename>'});
     **/
    update(data: IArticleFile): any {
        return super.baseUpdate('article-file-streams/{id}/{?width,height}', data);
    }
}

/**  
 * @overview  
 ***Notes:**  
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.  
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.  
 - All end-point objects are transformed by the associated route service. 
*/