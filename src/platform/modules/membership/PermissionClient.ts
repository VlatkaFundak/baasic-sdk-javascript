/* globals module */
/**  
 * @module permissionClient  
 * @description  Role Client provides an easy way to consume  Role REST API end-points. In order to obtain needed routes `permissionClient` uses `permissionRoute`. 
 */

import { injectable, inject } from "inversify";
import { IQueryModel, IOptions } from '../../../common/contracts';;
import { Utility } from '../../../common';
import { ApiClient, IHttpResponse, httpTYPES } from '../../../httpApi';
import { PermissionRoute, TYPES as membershipTypes } from './';
import { IAccessPolicy, IAccessAction, IRole, IPlatformUserInfo } from './contracts';
import { IBaasicApp, TYPES as coreTYPES } from '../../../core/contracts';

@injectable()
export class PermissionClient {

    private utility: Utility = new Utility();
    private permissionHash = {};

    /**                 
     * Provides direct access to `permissionRoute`.                 
     * @method                        
     * @example permissionClient.routeDefinition.get().expand(expandObject);                 
     **/
    get routeDefinition(): PermissionRoute {
        return this.permissionRoute;
    }

    constructor(
        @inject(membershipTypes.PermissionRoute) protected permissionRoute: PermissionRoute,
        @inject(httpTYPES.ApiClient) protected apiClient: ApiClient,
        @inject(coreTYPES.IBaasicApp) private application: IBaasicApp
    ) { }

    /**                  
     * Returns a promise that is resolved once the find action has been performed. Success response returns a list of role resources matching the given criteria.              
     * @method
     * @param options Query resource options object. 
     * @returns A promise that is resolved once the find action has beend performed.                            
     * @example permissionClient.find({   
                    section : '<access-section>',   
                    search : '<search-phrase>' 
                })
                .then(function (collection) {   
                    // perform success action here 
                },
                 function (response, status, headers, config) {   
                    // perform error handling here 
                });                     
     **/
    find(section: string, options?: any): PromiseLike<IHttpResponse<IAccessPolicy[]>> {
        return this.apiClient.get<IAccessPolicy[]>(this.permissionRoute.find(section, options));
    }

    /**
    * Returns a promise that is resolved once the getActions action has been performed. Success response returns a list of access policies that match the specified search parameters.
    * @method        
    * @example 
            permissionClient.getActions({
            search : '<search-phrase>'
            })
            .success(function (collection) {
            // perform success action here
            })
            .error(function (response, status, headers, config) {
            // perform error handling here
            });    
    **/
    getActions(options?: any): PromiseLike<IHttpResponse<IAccessAction[]>> {
        return this.apiClient.get<IAccessAction[]>(this.routeDefinition.getActions(options));
    }

    /**
    * Returns a promise that is resolved once the getPermissionSubjects action has been performed. Success response returns a list of matching user and role resources.
    * @method        
    * @example 
            permissionClient.getPermissionSubjects({
            orderBy : '<field>',
            orderDirection : '<asc|desc>',
            search : '<search-phrase>'
            })
            .success(function (collection) {
            // perform success action here
            })
            .error(function (response, status, headers, config) {
            // perform error handling here
            }); 
    **/
    getPermissionSubjects(options: any): PromiseLike<any> {
        let queue: PromiseLike<any>[] = [];
        let resolvedTasks = 0;
        var self = this;
        queue.push(this.getUsers(options)
            .then(function (collection) {
                let membCollection: any[] = [];
                collection.data.item.forEach(element => {
                    var membershipItem = {
                        name: element.userName,
                        role: ''
                    };
                    membCollection.push(self.utility.extend(membershipItem, element));
                });
                return membCollection;
            }, function (data) {
                if (data.status !== undefined && data.status !== 403) {
                    return data;
                }
            }));
        queue.push(self.getRoles(options)
            .then(function (collection) {
                let membCollection: any[] = [];
                collection.data.item.forEach(element => {
                    var membershipItem = {
                        name: element.name,
                        roleName: element.name,
                        userName: ''
                    };
                    membCollection.push(self.utility.extend(membershipItem, element));
                });
                return membCollection;
            }, function (data) {
                if (data.status !== undefined && data.status !== 403) {
                    return data;
                }
            }));

        return Promise.all(queue).then(function (membershipCollection) {
            return self.utility.OrderByArray([].concat.apply([], membershipCollection), 'name');
        });
    }

    /**
     * Returns a promise that is resolved once the create action has been performed; this action creates a new permission resource.
     * @method        
     * @example 
            // readAction and updateActions are resources previously fetched using getActions.
            permissionClient.create({
            actions : [readAction, updateAction],
            section : '<section-name>',
            userName : '<userName>'
            })
            .success(function (data) {
            // perform success action here
            })
            .error(function (response, status, headers, config) {
            // perform error handling here
            });
    **/
    create(data: IAccessPolicy): PromiseLike<IHttpResponse<IAccessPolicy[]>> {
        return this.apiClient.post<IAccessPolicy[]>(this.permissionRoute.create(), data);
    }
    /**
    * Returns a promise that is resolved once the remove action has been performed. If the action is successfully complete, an access policy assigned to the specified role and section will be removed. 
    * @method        
    * @example 
            // permission is a resource previously fetched using get action.				 
            permissionClient.remove(permission)
            .success(function (data) {
            // perform success action here
            })
            .error(function (response, status, headers, config) {
            // perform error handling here
            });		
   **/
    remove(data: IAccessPolicy): PromiseLike<IHttpResponse<any>> {
        return this.apiClient.delete(this.routeDefinition.remove(data));
    }
    /**
    * Creates a new in-memory permission object.
    * @method        
    * @example 
            // action collection are lookup items fetched using lookupClient.get action.
            var actionCollection;
            return lookupClient.get()
            .success(function (data) {
            actionCollection = data;
            })
            .error(function (data, status, headers, config) {});
            // subjectItem is an item fetched using permissionClient.getPermissionSubjects action.
            permissionClient.createPermission('<section-Name>', actionCollection, subjectItem);
   **/
    createPermission(section: string, actions: IAccessAction[], membershipItem: any): any {
        var permission = {
            dirty: true,
            role: membershipItem.roleName,
            userName: membershipItem.userName,
            section: section,
            actions: []
        };
        actions.forEach(element => {
            var newAction = {
                checked: false
            };
            this.utility.extend(newAction, element);
            permission.actions.push(newAction);

        });
        return permission;
    }
    /**
    * Finds a permission in a given permission collection.
    * @method        
    * @example permissionClient.findPermission(permissionObj, permissionCollection);
   **/
    findPermission(permission, permissionCollection) {
        for (var i = 0; i < permissionCollection.length; i++) {
            var item = permissionCollection[i];

            if (item.section === permission.section &&
                ((!this.isEmpty(item.role) && !this.isEmpty(permission.role) && item.role === permission.role) ||
                    (!this.isEmpty(item.userName) && !this.isEmpty(permission.userName) && item.userName === permission.userName))) {
                return item;
            }
        }
        return undefined;
    }
    /**
    * Checks if a permission object exists in a given permission collection.
    * @method        
    * @example permissionClient.exists(permissionObj, permissionCollection);
   **/
    exists(permission, permissionCollection) {
        return this.findPermission(permission, permissionCollection) !== undefined;
    }
    /**
    * Returns a promise that is resolved once the togglePermission action has been completed. The action will internally either call a `remove` or `create` action based on given criteria.
    * @method        
    * @example permissionClient.togglePermission(permissionObj, action);
    **/
    togglePermission(permission, action) {
        var requestPermission = {
            actions: []
        };
        this.utility.extend(requestPermission, permission);
        requestPermission.actions = [action];

        var operation;
        if (!action.checked) {
            operation = this.remove;
        } else {
            operation = this.create;
        }
        return operation.call(this, requestPermission);
    }
    /**
    * Fetches and returns and object containing all existing module permissions.
    * @method        
    * @example permissionClient.getModulePermissions('<section-name>');
    **/
    getModulePermissions(section) {
        var permission = {
            update: this.hasPermission(this.firstCharToLowerCase(section) + '.update'),
            create: this.hasPermission(this.firstCharToLowerCase(section) + '.create'),
            remove: this.hasPermission(this.firstCharToLowerCase(section) + '.delete'),
            read: this.hasPermission(this.firstCharToLowerCase(section) + '.read'),
            full: this.hasPermission(this.firstCharToLowerCase(section) + '.full')
        };
        return permission;
    }

    resetPermissions() {
        this.permissionHash[this.application.getApiKey()] = {};
    }

    /**
    * Checks if current user has permissions to perform a certain action. To optimize performance this information is cached and can be reset using the resetPermissions action. Permissions cache should be reset when updated user information is set.
    * @method        
    * @example baasicAuthorizationService.hasPermission("<baasic-Section>.<action>");				
    **/
    hasPermission(authorization: string): boolean {
        let apiKey = this.application.getApiKey();

        //Initialize application permissions
        if (!this.permissionHash.hasOwnProperty(apiKey)) {
            this.resetPermissions();
        }

        if (this.permissionHash[apiKey].hasOwnProperty(authorization)) {
            return this.permissionHash[apiKey][authorization];
        }

        var userContainer = this.application.getUser();
        if (userContainer === undefined) {
            return;
        }
        var user = userContainer.user;
        var hasPermission = false;

        if (user) {
            if (user.permissions) {
                var tokens = authorization.split('.');
                if (tokens.length > 0) {
                    var section = tokens[0];

                    var sectionPermissions = user.permissions[section];
                    if (sectionPermissions) {
                        if (tokens.length > 1) {
                            var action = tokens[1].toLowerCase();
                            for (var i = 0; i < sectionPermissions.length; i++) {
                                if (sectionPermissions[i].toLowerCase() === action) {
                                    hasPermission = true;
                                    break;
                                }
                            }
                        } else {
                            hasPermission = true;
                        }
                    }
                }
            }
        }

        this.permissionHash[apiKey][authorization] = hasPermission;
        return hasPermission;
    }

    private isEmpty(data) {
        return data === undefined || data === null || data === '';
    }

    private getRoles(options): PromiseLike<IHttpResponse<IQueryModel<IRole>>> {
        return this.apiClient.get(this.routeDefinition.getRoles(options));
    }

    private getUsers(options): PromiseLike<IHttpResponse<IQueryModel<IPlatformUserInfo>>> {
        return this.apiClient.get(this.routeDefinition.getUsers(options));
    }

    private firstCharToLowerCase(text) {
        return text.replace(/^./, function (char) {
            return char.toLowerCase();
        });
    }


}

/**  
 * @overview  
 ***Notes:**  
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.  
 - All end-point objects are transformed by the associated route definition. 
*/