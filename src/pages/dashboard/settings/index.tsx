import BankingInfo from "./_compnent/bankingInfo";
import CashApp from "./_compnent/cashApp";
import CryptoInfo from "./_compnent/cryptoInfo";
import Email from "./_compnent/email";
import WhatsAppLink from "./_compnent/whatsApp";

function Settings() {
  return (
    <div className="space-y-6">
      <BankingInfo />
      <CryptoInfo />
      <CashApp />
      <Email />
      <WhatsAppLink />
    </div>
  );
}

export default Settings;
