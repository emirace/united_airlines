import BankingInfo from "./_compnent/bankingInfo";
import CryptoInfo from "./_compnent/cryptoInfo";

function Settings() {
  return (
    <div className="space-y-6">
      <BankingInfo />
      <CryptoInfo />
    </div>
  );
}

export default Settings;
