import { useState } from 'react';
import logo from '../../img/header-logo.svg';
import headerImg from '../../img/HEADER_IMG.svg';
import headerImgLogged from '../../img/HEADER-community.svg';
import { useUserIDContext } from '../../UserIDContext';
import Input from '../inputs/Input';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import EventFilter from '../pages/event/EventFilter';

interface HomeRouteName {
  homeRoute: 'home' | undefined;
}

export const Header: React.FC<HomeRouteName> = ({ }) => {
  const { userID } = useUserIDContext();
  const [homeRoute, setHomeRoute] = useState<'home' | undefined>('home');
const [query, setQuery] = useState<string>("");
const [plz, setPLZ] = useState<string>("");
const [loading, setLoading] = useState(false);


 const {
        register,
        handleSubmit,
        //setError,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({})

const handleSearch:SubmitHandler<FieldValues> = (data) => {
    //setLoading(true);
    setQuery(data.query||"");
    setPLZ(data.plz||"");
    console.log("click")
    //setLoading(false);
}


const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | File) => {
    if (e instanceof File || e === null) {
        return;
    }
    const { name, value } = e.target;
    if (name === 'query') {
        setQuery(value);
    } else if (name === 'plz') {
        setPLZ(value);
    }
};

  return (
    <header>
      <div className="max-grid">
        {userID == undefined ?
          // MAIN PAGE WTHOUT LOGIN
          <>
            <div className="header-general">
              <div className='grid grid-cols-1 lg:gap-5 lg:grid-cols-12'>
                <div className="lg:col-span-8 clouds">
                  <img src={logo} className="header-logo" alt="Logo" />
                  <h1 className="font-francisco">Mach die Stadt zu deinem Abendteuer
                    <span className="font-sans">
                      Willkommen bei Click & Connect! Tauche ein in unsere Eventplattform und entdecke spannende Abenteuer in deiner Stadt. Erlebe die Vielfalt deiner Stadt auf völlig neue Weisen und knüpfe wertvolle Verbindungen. Sei Teil unserer Community und gestalte deine Freizeit auf einzigartige Art und Weise.
                    </span>
                    <form onSubmit={() => { handleSubmit(handleSearch) }}>
                      <label>
                        <Input
                            type='text'
                            label='Event suchen'
                            id='query'
                            register={register}
                            errors={errors}
                            disabled={loading}
                            pattern={/^[A-Za-z0-9\s\-.]+$/}
                            onChangeFn={handleOnChange}
                            customInputClassNames=' '
                            customLabelClassNames=' '
                        />
                      </label>
                      <label>
                        <Input
                            type='text'
                            label='Postleitzahl'
                            id='plz'
                            register={register}
                            errors={errors}
                            disabled={loading}
                            pattern={/^[A-Za-z0-9\s\-.]+$/}
                            onChangeFn={handleOnChange}
                            customInputClassNames=' '
                            customLabelClassNames=' '
                        />
                      </label>
                      <label>
                        <input type="submit" />
                      </label>
                    </form>
                    <br></br>
                  </h1>
                  
                </div>
                <div className="col-span-1 header-img-box lg:col-span-4">
                  <img src={headerImg} className="header-img" alt="Pärchen erkundet eine Stadt" />
                </div>
              </div>
            </div>
            <EventFilter query={query} /*setQuery={setQuery} setPLZ={setPLZ} */plz={plz} ></EventFilter>
          </> : <>{/* MAINPAGE WITH LOGGED IN USER */}
            <div className="header-logged-in">
              <div className='grid md:gap-5 md:grid-cols-12'>
                <div className="grid col-span-1 md:col-span-5">
                  <img src={headerImgLogged} className="cummunityImg" alt="Meet some people"></img>
                </div>
                <div className="col-span-1 md:col-span-7">
                  <h1>Hi</h1>
                  <p>Willkommen! Du hast 3 neue Nachrichten und eine Bewertung!</p>
                  <p>Überall dieselbe alte Leier. Das Layout ist fertig, der Text lässt auf sich warten. Damit das Layout nun nicht nackt im Raume steht und sich klein und leer vorkommt, springe ich ein: der Blindtext.</p>
                  </div>
              </div>
              <form onSubmit={() => { handleSubmit(handleSearch) }}>
                      <label>
                        <Input
                            type='text'
                            label='Event suchen'
                            id='query'
                            register={register}
                            errors={errors}
                            disabled={loading}
                            pattern={/^[A-Za-z0-9\s\-.]+$/}
                            onChangeFn={handleOnChange}
                            customInputClassNames=' '
                            customLabelClassNames=' '
                        />
                      </label>
                      <label>
                        <Input
                            type='text'
                            label='Postleitzahl'
                            id='plz'
                            register={register}
                            errors={errors}
                            disabled={loading}
                            pattern={/^[A-Za-z0-9\s\-.]+$/}
                            onChangeFn={handleOnChange}
                            customInputClassNames=' '
                            customLabelClassNames=' '
                        />
                      </label>
                      <label>
                        <input type="submit" />
                      </label>
                    </form>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <EventFilter query={query} /*setQuery={setQuery} setPLZ={setPLZ} */plz={plz} ></EventFilter>
            </div>
            
          </>}
      </div>
    </header>
  );
};
