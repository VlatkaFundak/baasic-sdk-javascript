/* globals module */ 
/**  
 * @module baasicUserProfileAvatarRouteDefinition  
 * @description Baasic User Profile Avatar Route Definition provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Profile Avatar Route Definition to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services. 
 */

import { BaasicBaseRouteDefinition, ModelMapper, Utility } from 'common';
import { IOptions } from 'common/contracts';
import { BaasicUserProfileAvatarStreamsRouteDefinition } from 'modules/userProfile';
import { IProfileAvatar } from 'modules/userProfile/contracts';

export class BaasicUserProfileAvatarRouteDefinition extends BaasicBaseRouteDefinition {

    get streams(): BaasicUserProfileAvatarStreamsRouteDefinition {
        return this.baasicUserProfileAvatarStreamsRouteDefinition;
    }
    
    constructor(
        protected modelMapper: ModelMapper,
        protected baasicUserProfileAvatarStreamsRouteDefinition: BaasicUserProfileAvatarStreamsRouteDefinition
    ) { super(modelMapper); }

    /**                 
     * Parses get route; this route should be expanded with the Id of the profile.                 
     * @method 
     * @param id User Profile id which uniquely identifies user avatar resource that needs to be retrieved.
     * @param options Query resource options object.                       
     * @example baasicUserProfileAvatarRouteDefinition.get({id: '<file-id>'});                               
     **/
    get(id: string, options?: IOptions): any {
        return super.baseGet('profiles/{id}/avatars/{?embed,fields}', id, options);
    }

    /**                 
     * Parses update route; this URI template does not expose any additional options.                 
     * @method
     * @param data A Profile Avatar object used to update specified Profile Avatar resource.                        
     * @example baasicUserProfileAvatarRouteDefinition.update(data);                              
     **/
    update(data: IProfileAvatar): any {
        return super.baseUpdate('profiles/{userId}/avatars', data);
    }

    /**                 
     * Parses link route; this route should be expanded with the Id of the profile.                 
     * @method 
     * @param id User Profile id which uniquely identifies user avatar resource that needs to be retrieved. 
     * @param data A Profile Avatar object used to link specified Profile Avatar resource.                      
     * @example baasicUserProfileAvatarRouteDefinition.link({id: '<file-id>'});                              
     **/
    link(id: string, data: IProfileAvatar): any {
        let params = this.utility.extend({}, data);                     
        params.id = id;
        return super.parse('profiles/{id}/avatars/link').expand(params);
    }

    /**                 
     * Parses link route; this route should be expanded with the Id of the profile.                 
     * @method
     * @param data A Profile Avatar object used to unlink specified Profile Avatar resource.
     * @param options Query resource options object.                         
     * @example baasicUserProfileAvatarRouteDefinition.unlink(data);                              
     **/
    unlink(data: IProfileAvatar, options?: IOptions): any {
        if (!options) {                         
            options = {};                     
        }
        return super.baseDelete('profiles/{userId}/avatars/unlink', data, options);
    }

    createParams(data: any, id: string): any {
        let params = this.utility.extend(data);                     
        params.id = id;
        return super.createParams(params);
    }
}

/**  
 * @overview  
 ***Notes:**  
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.  
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.  
 - All end-point objects are transformed by the associated route service. 
 */