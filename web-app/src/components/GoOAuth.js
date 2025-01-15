

import {useEffect ,useState} from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useSearchParams } from "react-router-dom";


const GoOAuth=()=>{

    // let search=new URL(window.location.href).search
    // const searchParams = new URLSearchParams(search);
    // let to=searchParams.get('redirect_to')

    // const [setCookie, removeCookie] = useCookies(['ghostToken']);
    const [cookies, setCookie] = useCookies(["gg_token"]);
     const navigate = useNavigate();

    

    const [loading,setLoading]=useState(true)
    const makeReq=(obj)=>{
        let url=`${process.env.REACT_APP_SERVER_HOST}/auth/google`
        fetch(url,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(obj)
        }).then(async res=>{
            if(res.status===200){
                let response=await res.json()
                if (response.status === "success") {
                    console.log(response)
                    const gg_token = response.gg_token;
                    const date = new Date();
                    date.setTime(date.getTime() + 21 * 24 * 60 * 60 * 1000); // 21 days from now
          
                    setCookie("gg_token", gg_token, { path: "/", expires: date });
                    navigate(`/success`)
                    // navigate(`/confirm-signup`,{ state: { email: formData.email }});
                  } else {
                    // setApiError(response.data.message);
                    setLoading(false)
                  }
                // const {ghostToken}=response
              
                // setCookie('ghostToken',ghostToken,{path:'/',expires:date})
                // window.location.href = '/app/dashboard';
                
                // if(search.length>1){
                //     window.location.href=to
                // }else{
                //     
                // }
            }else{
                setLoading(false)
            }
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
        })
    }
    let sers=new URL(window.location.href)
    const params = Object.fromEntries(sers.searchParams.entries());
    const code=sers.searchParams.get('code')
    const scope=sers.searchParams.get('scope')
    // const permission=sers.searchParams.get('permission')
    console.log(code)
    console.log(scope)
    // console.log(permission);


    
    // for (const key in params) {
    //     console.log(`${key}: ${params[key]}`);
    //   }

    useEffect(()=>{
        if(code && scope){
            makeReq({code,scope})
        }
    },[code,scope])
    return(
        <div>
            <div justifyContent='center' alignItems='center' h='500px'>

                   {loading?<h1>Getting...</h1>:
                   <div>
                        <p fontWeight='500' textAlign='center'>Failed to authorize Google client. Please try again</p>
                        <a textDecoration='none' textAlign='center' href='/login'>back to login</a>
                    </div>}
            </div>

        </div>
    )
}


export default GoOAuth