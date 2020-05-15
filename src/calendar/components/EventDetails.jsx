import React, {useEffect} from 'react';
import {Calendar} from "./Calendar";
import {CalendarHeader} from "./CalendarHeader";


export const EventDetails = () =>{
    useEffect(()=>{
        let contentWindow, intervalID, contentWindowHref;
        const urlNavigate = 'https://jvaneyck.wordpress.com/2014/01/07/cross-domain-requests-in-javascript/';
        const redirectURL = "https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy";
        const handler = ()=>{
            console.log("handler started..");
            if (contentWindow?.closed) {
                console.log("close", {contentWindow});
                // eslint-disable-next-line no-undef
                if(intervalID){
                    // eslint-disable-next-line no-undef
                    clearInterval(intervalID);
                }
                return;
            }

            try {
                /*
                 * Will throw if cross origin,
                 * which should be caught and ignored
                 * since we need the interval to keep running while on STS UI.
                 */
                console.log("contentWindow",contentWindow);
                contentWindowHref = contentWindow.location.href;
                console.log("contentWindowHref",contentWindowHref);
            } catch (e) {}
            if (!contentWindowHref || contentWindowHref === "about:blank") {
                return;
            }
            const isRedirectionReqd = contentWindowHref === redirectURL;

            console.log({isRedirectionReqd});
            if(isRedirectionReqd){
                clearInterval(intervalID);
                window.location.href = redirectURL;
            }
        };
        const winLeft = window.screenLeft ? window.screenLeft : window.screenX;
        const winTop = window.screenTop ? window.screenTop : window.screenY;
        /**
         * window.innerWidth displays browser window"s height and width excluding toolbars
         * using document.documentElement.clientWidth for IE8 and earlier
         */
        const popUpWidth = 483;
        const popUpHeight = 600;

        const title = "external link";
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const left = ((width / 2) - (popUpWidth / 2)) + winLeft;
        const top_1 = ((height / 2) - (popUpHeight / 2)) + winTop;
        // open the window
         contentWindow = window.open(urlNavigate, title, "width=" + popUpWidth + ", height=" + popUpHeight + ", top=" + top_1 + ", left=" + left + ", scrollbars=yes");
        if (!contentWindow) {
            console.log("not working ....");
        }
        if (contentWindow.focus) {
            contentWindow.focus();
        }
        intervalID = setInterval(handler, 1000);

    }, []);
    return <>
        <CalendarHeader headerText="Event Details" />
        <Calendar/>
    </>;
}
