/* globals module */
/**  
 * @module commerceLookupsAddressTypeBatchRoute  
 * @description Baasic Commerce Lookups AddressType Batch Route Definition provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce Lookups AddressType Batch Route Definition to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services. 
 */

import { injectable, inject } from "inversify";
import { BaseRoute } from '../../../../common';
import { IGetRequestOptions, IOptions } from '../../../../common/contracts';;
import { IAppOptions, TYPES as coreTypes } from '../../../../core/contracts';

@injectable()
export class CommerceLookupsAddressTypeBatchRoute extends BaseRoute {

    public readonly createRoute: string = 'commerce/lookups/address-types/batch';

    public readonly updateRoute: string = 'commerce/lookups/address-types/batch';

    public readonly deleteRoute: string = 'commerce/lookups/address-types/batch';

    constructor(
        @inject(coreTypes.IAppOptions) protected appOptions: IAppOptions
    ) { super(appOptions); }

    /**                      
     * Parses create commerce address type batch route; this route does not expose any additional options                      
     * @method                     
     * @example commerceLookupsAddressTypeRoute.create();                      
     */
    create(): any {
        return super.baseCreate(this.createRoute, {});
    }

    /**                      
     * Parses remove commerce address type batch route; this route does not expose any additional options                      
     * @method                     
     * @example commerceLookupsAddressTypeRoute.update();                      
     */
    update(): any {
        return super.baseUpdate(this.updateRoute, {});
    }

    /**                      
     * Parses remove commerce address type batch route; this route does not expose any additional options                      
     * @method                    
     * @example commerceLookupsAddressTypeRoute.remove();                      
     */
    delete(): any {
        return super.baseDelete(this.deleteRoute, {});
    }
}

/**  
 * @copyright (c) 2017 Mono Ltd  
 * @license MIT  
 * @author Mono Ltd  
 * @overview  
 ***Notes:**  
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.  
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.  
 - All end-point objects are transformed by the associated route service. 
 */