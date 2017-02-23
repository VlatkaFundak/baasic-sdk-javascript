/* globals module */ 
/**  
 * @module baasicOrganizationBatchClient  
 * @description Baasic Organization Batch Client provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Organization Batch Route Definition to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services. 
 */

import { BaasicOrganizationBatchRouteDefinition } from 'modules/userProfile';
import { IOrganization } from 'modules/userProfile/contracts';

export class BaasicOrganizationBatchClient {

    get routeDefinition(): BaasicOrganizationBatchRouteDefinition {
        return this.baasicOrganizationBatchRouteDefinition;
    }
    
    constructor(protected baasicOrganizationBatchRouteDefinition: BaasicOrganizationBatchRouteDefinition) {}

    /**                   
     * Returns a promise that is resolved once the create organization action has been performed; this action creates new organization resources.                   
     * @method
     * @param data A collection of organization objects that need to be inserted into the system.
     * @returns A promise that is resolved once the create organization action has been performed.                          
     * @example   baasicOrganizationBatchClient.create([{     
                    description : '<description>',     
                    name : '<name>',     
                    slug: '<slug>'   
                  }])
                  .then(function (data) {     
                      // perform success action here   
                   }, 
                    function (response, status, headers, config) {     
                        // perform error handling here   
                   });                   
     **/ 		
    create(data: IOrganization[]): Promise<any> {
        return this.baasicApiHttp.post(this.baasicOrganizationBatchRouteDefinition.create(), this.baasicOrganizationBatchRouteDefinition.createParams(data));
    }

    /**                   
     * Returns a promise that is resolved once the update organization action has been performed; this action updates specified organization resources.                   
     * @method
     * @param data A collection of organization objects used to update specified organization resources.
     * @returns A promise that is resolved once the update organization action has been performed.                         
     * @example   baasicOrganizationBatchClient.update(organizations)
                    .then(function (data) {     
                        // perform success action here   
                    }, 
                     function (response, status, headers, config) {     
                         // perform error handling here   
                    });                   
     **/
    update(data: IOrganization[]): Promise<any> {
        return this.baasicApiHttp.put(this.baasicOrganizationBatchRouteDefinition.update, this.baasicOrganizationBatchRouteDefinition.updateParams(data));                                     
    }

    /**                   
     * Returns a promise that is resolved once the remove action has been performed. This action will remove organization resources from the system if successfully completed.                   
     * @method                         
     * @example baasicOrganizationBatchClient.remove(organizationIds)
                    .then(function (data) {     
                        // perform success action here   
                    },
                     function (response, status, headers, config) {     
                         // perform error handling here   
                    });		                  
     **/	
    remove(ids: string[]): Promise<any> {
        return this.baasicApiHttp({ 
                    url: this.baasicOrganizationBatchRouteDefinition.delete(),                         
                    method: 'DELETE',                         
                    data: ids                     
                }); 
    }
}

/**  
 * @overview  
 ***Notes:**  
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.  
 - All end-point objects are transformed by the associated route service. 
 */