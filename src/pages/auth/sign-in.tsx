import { FormRegister } from '../../components/auth/form-register'
import { SeparateBorder } from '../../components/separete-border'

export function SignIn() {
  return (
    <div className="flex flex-col items-center p-6 w-[384px] h-125 bg-bg-1 border border-border-default shadow-[0_0_700px_5px_rgba(0,0,0,0.5)] shadow-accent-brand-muted">
      <div className="flex flex-col items-center gap-3">
        <svg width="56" height="56" viewBox="0 0 44 44" fill="none">
          <polygon
            points="22,1 43,22 22,43 1,22"
            stroke="#d1b464"
            strokeWidth="1.1"
            opacity="0.9"
          />
          <line x1="22" y1="1" x2="22" y2="7" stroke="#d1b464" strokeWidth="1" opacity="0.7" />
          <line x1="22" y1="37" x2="22" y2="43" stroke="#d1b464" strokeWidth="1" opacity="0.7" />
          <line x1="1" y1="22" x2="7" y2="22" stroke="#d1b464" strokeWidth="1" opacity="0.7" />
          <line x1="37" y1="22" x2="43" y2="22" stroke="#d1b464" strokeWidth="1" opacity="0.7" />
          <polygon points="22,10 34,22 22,34 10,22" stroke="#7b2ff7" strokeWidth="1.3" />
          <polygon points="22,17 27,22 22,27 17,22" fill="#7b2ff7" />
        </svg>
        <h1 className="uppercase text-[20px] leading-[150%] font-bold">Origin</h1>
        <p className="text-[14px] leading-[150%] text-center text-text-tertiary">
          acesse sua conta
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 border border-border-default hover:border-border-strong bg-bg-2 p-3 mt-7 cursor-pointer w-full ">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          data-fg-d3bl170="0.8:1.145971:/src/app/App.tsx:807:11:44110:772:e:svg:etetete"
          data-fgid-d3bl170=":rb:"
        >
          <path
            fill="#4285F4"
            d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
            data-fg-d3bl171="0.8:1.145971:/src/app/App.tsx:808:13:44171:156:e:path"
          ></path>
          <path
            fill="#34A853"
            d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
            data-fg-d3bl172="0.8:1.145971:/src/app/App.tsx:809:13:44340:168:e:path"
          ></path>
          <path
            fill="#FBBC05"
            d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
            data-fg-d3bl173="0.8:1.145971:/src/app/App.tsx:810:13:44521:162:e:path"
          ></path>
          <path
            fill="#EA4335"
            d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
            data-fg-d3bl174="0.8:1.145971:/src/app/App.tsx:811:13:44696:169:e:path"
          ></path>
        </svg>

        <span className="text-text-primary leading-[150%] font-normal text-[14px]">
          Acesse com o google
        </span>
      </div>

      <SeparateBorder />

      <FormRegister />
    </div>
  )
}
