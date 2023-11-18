export default function AccountPopUp({
  Account,
  setAccountPopup,
  signOut,
  LoggedIn,
  setLoggedIn,
}) {
  return (
    <div className="absolute z-50 bg-slate-800 p-3 rounded-xl right-3 top-12 ">
      {Account &&
        Account.filter((item) => item._id !== LoggedIn._id).map((item) => (
          <div
          key={item._id}
          className=" flex py-2 hover:bg-zinc-900 rounded-lg"
            onClick={() => {
              setLoggedIn(null);
              sessionStorage.removeItem("LoggedIn");
            }}
          >
            <img
              src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
              alt="Account"
              className="rounded  object-cover w-[25px] h-[25px] mx-2 mr-3"
            />
            <div>{item.name}</div>
          </div>
        ))}
    </div>
  );
}
