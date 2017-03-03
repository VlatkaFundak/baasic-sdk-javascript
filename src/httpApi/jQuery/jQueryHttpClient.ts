import { IHttpHeaders, IHttpRequest, IHttpResponse, IHttpClient } from 'httpApi';

declare var $: any;

var client: IHttpClient;

client = <ResponseType>(request: IHttpRequest): PromiseLike<IHttpResponse<ResponseType>> => {
    var jqueryParams: any = {
        method: request.method,
        xhrFields: {
            withCredentials: true
        }
    };

    if (request.headers) {
        jqueryParams.headers = request.headers;
    }

    if (request.body) {
        jqueryParams.data = request.body;
    }

    return $.ajax(request.url.toString(), jqueryParams)
        .then((data, textStatus, jqXHR) => {
            return <IHttpResponse<ResponseType>>{
                statusText: textStatus,
                statusCode: jqXHR.status,
                headers: parseHeaders(jqXHR.getAllResponseHeaders()),
                body: data
            };
        },
        (jqXHR, textStatus, errorThrown) => {
            return <IHttpResponse<ResponseType>>{
                statusText: textStatus,
                statusCode: jqXHR.status,
                headers: parseHeaders(jqXHR.getAllResponseHeaders()),
                body: jqXHR.responseText || jqXHR.responseXML
            };
        });
};

function parseHeaders(headers: string): IHttpHeaders {
    let result: IHttpHeaders = {};
    if (headers) {
        var arrayOfLines = headers.match(/[^\r\n]+/g);
        for (var i = 0; i < arrayOfLines.length; i++) {
            var line = arrayOfLines[i];
            var keyValue = line.split(':');
            if (keyValue.length === 2) {
                result[keyValue[0]] = keyValue[1].trim();
            } else if (keyValue.length === 1) {
                result[keyValue[0]] = null;
            }
        }
    }
    return result;
}


export { client };

