import BankingInfo from "./_compnent/bankingInfo";
import CryptoInfo from "./_compnent/cryptoInfo";
import Email from "./_compnent/email";

function Settings() {
  return (
    <div className="space-y-6">
      <BankingInfo />
      <CryptoInfo />
      <Email />
    </div>
  );
}

export default Settings;
