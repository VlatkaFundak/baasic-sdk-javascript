/* globals module */ 
/**  
 * @module baasicSkillBatchClient  
 * @description Baasic Skill Batch Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Skill Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services. 
 */

import { BaasicSkillBatchRouteDefinition } from 'modules/userProfile';
import { ISkill } from 'modules/userProfile/contracts';

export class BaasicSkillBatchClient {

    constructor(protected baasicSkillBatchRouteDefinition: BaasicSkillBatchRouteDefinition) {}

    /**                   
     * Returns a promise that is resolved once the create skill action has been performed; this action creates new skill resources.                   
     * @method
     * @param data A collection of skill objects that need to be inserted into the system.
     * @returns A promise that is resolved once the create skill action has been performed.                         
     * @example   baasicSkillClient.create([{     
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
    create(data: ISkill[]): Promise<any> {
        return this.baasicApiHttp.post(this.baasicSkillBatchRouteDefinition.create(), this.baasicSkillBatchRouteDefinition.createParams(data));
    }

    /**                   
     * Returns a promise that is resolved once the update skill action has been performed; this action updates specified skill resources.                   
     * @method
     * @param data A collection of skill objects used to update specified skill resources.
     * @returns A promise that is resolved once the update skill action has been performed.                         
     * @example   baasicSkillBatchClient.update(companies)
                    .then(function (data) {     
                        // perform success action here   
                    }, 
                     function (response, status, headers, config) {     
                         // perform error handling here   
                    });                   
     **/ 				
    update(data: ISkill[]): Promise<void> {
        return this.baasicApiHttp.put(this.baasicSkillBatchRouteDefinition.update(), this.baasicSkillBatchRouteDefinition.updateParams(data));
    }

    /**                   
     * Returns a promise that is resolved once the remove action has been performed. This action will remove skill resources from the system if successfully completed.                   
     * @method
     * @param ids Collection of skill ids which uniquely identifies skill resources that need to be deleted.
     * @returns A promise that is resolved once the remove action has been performed.                        
     * @example baasicSkillBatchClient.remove(skillIds)
                    .then(function (data) {     
                        // perform success action here   
                    }, 
                     function (response, status, headers, config) {     
                         // perform error handling here   
                    });		                  
     **/		                  
    remove(ids: string[]): Promise<void> {
        return this.baasicApiHttp({ 
                    url: this.baasicSkillBatchRouteDefinition.delete(),                         
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