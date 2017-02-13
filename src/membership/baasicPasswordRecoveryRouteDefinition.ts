/* globals module */ 
/**  
 * @module baasicPasswordRecoveryRouteDefinition  
 * @description Baasic Password Recovery Route Definition provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Password Recovery Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services. 
*/

export class BaasicPasswordRecoveryRouteDefinition {

    /**                  
     * Parses recover-password route, recover-password route doesn't expose any additional properties.                  
     * @method                         
     * @example baasicPasswordRecoveryRouteDefinition.passwordRecovery.expand({});                                
     **/
    passwordRecovery(): any {
        return this.baasicUriTemplateProcessor.parse('recover-password');
    }

    /**                  
     * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.                  * @method                  * @example baasicPasswordRecoveryRouteDefinition.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
     * @param link route link                  
     **/  				
    parse(link: string): any {
        return this.baasicUriTemplateProcessor.parse(link);
    }
}

/**  
 * @overview  
 ***Notes:**  
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.  
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.  
 - All end-point objects are transformed by the associated route service. 
*/