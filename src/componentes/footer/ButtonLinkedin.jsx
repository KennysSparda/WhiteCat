import Button from "./Button";

export default function btnLinkedin() {
  var links = ["https://kennyvargas.vercel.app/"];
  return (
    <Button type="linkEx" id="btnHome" path={links[0]}>
      <div className="flex items-center">
        <img src="/img/kenny.ico"></img>
        <span className="ml-2">Kenny Vargas</span>
      </div>
    </Button>
  );
}
