import { initializeApp, cert, getApps, type ServiceAccount } from 'firebase-admin/app';

const configs = {
  type: "service_account",
  project_id: "nuxt3todo",
  private_key_id: "bbd69a68e1fa2df6e104c452aca03197f13cdc0f",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCigrM+s6z323Mo\nDKQ8PvJlI5ghDZ3vAkAAUE7qLEbHYsfp1RQsrKbwBdl0WQuZJNAhhSVMIUZgShCP\nTaggaLW0Kl1M2NQDay8TBR+zWyJQWTs4uci4CC4GVTMAhd84RZen0xRXFtgaB2oJ\nWS4bKLWjP6entOKldQkxRiUlSPQ+MXPOTIum9Wb7QMfuuzXFErb4dE3nqjVRsaP0\nb9jKs3U8rNWOt0g9wy6hTe8WwVTTobx3f1gNs+uz6drrJS9zl/G7lSe9SVFqiL3/\nWSTALFUcLZC/NJsN1P5ysdaQJrJoURjNwDk48lAMT2EPEK7DPbGqa17EqEHCT8PM\nhMGl7NbRAgMBAAECggEABaLQhljLI4Pw+hc5JW098RfDTYcoPmsmrtQaLoknUcAp\nZIDLLLL2ra2YQW6apj6meLkiRmIDi7CZ4yxra6dSAOv0tSbycGVp2igj9a+QELcN\nhJ292jMPbJENHiQmbhBMzolVo+ETENEHwof9HzxB02XwYbK2ZwxYa6TuAh1l+hel\nEY6wTNCV2PbWG8hGj4u95XmUHKyHUfM5M7Zhsys7xOK6dKcNBrxQHO7LkwHulq+s\nYf5rei+HzEs4yPI2+BHC2y+OO+jro2zjPpCjG1OH86IbGWk3aaoV+I9tpPPf+Cua\nXODuuuqqKNVvcf7CuqeSmP87rCpzQ7eG6BvIrrB82QKBgQDMzHXkZP0OboHOhnxO\nbv0n2IIQTeG7vzKL34K6fdPL719+/X8jUtzbjVgDy0wPnYYlENK81QkTqGGMQ28i\nn9GuuU7I0R9QmKIsu9WLucqeveztUg7NowqK3NT6IW12rHmEhf1vE55h2H4aXJCW\n8t5mlai8ZPI+tHPzLVaYHltjGQKBgQDLI7ZCZQ3TjZy9Y4c3qdlOnkCmvjfQHmjU\n/PCtGUgFwo2SG2egfFABTp/aVmzMSW/gB8LeXeCkVpmSywWCCCMF7PuwtjlJo+a+\n1DfY1eC3dkA3zc6onR+ryWdOShZue9gx6W0JJxJJAz9/gAgkYc2osvxshMgOGfnf\nujuhnPMAeQKBgG29yhae/vMyyCAQ9J9a3hDx9ZAjC6j9ZWqKVJT2Q/3twTBdSjl1\nd5+2d8lgsNtVP8Kw5xwE1B5ShiMRJ4ZYOZX0+oClfrBDefOam22KG0dA4qqw4/nR\nOh77Aq0eKHgFKACZhBp3WtF3nuslWt1oO0ChRY/eT+jF7bQLQXG2IqZRAoGBALpw\nU1XKk48HWMTFdRPUclpiiim/SVBcqJBaebYVDvIiZnajak9z6KXaeIIWchJokCJI\nXURjWsrZpGeCp9J5D1Pf9fxwslFw+VVJRtxfJ7iZ8kSFQlekpa2v0n2bJ81NItZk\nS6trza9vKLcnVdG2Zd+gLmaW01mF47y/mv0wJCLZAoGAD4hIB/eCpoJmxTX8wUcq\ntYDGFEpBX3PkFidfp175a0HrUF2yaCGfnG8DDx7CCCOhuaJ6u2YnM8EfTT6+Zka6\nH1RATcVt+1lTLMxzkDb6G8Ka8OAUl0ZYuoiAQDUdNGjAr326kglV2X0wQlJUyRUA\nvA8ZK/ESoMHCUET4LIBCcEg=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-g51c8@nuxt3todo.iam.gserviceaccount.com",
  client_id: "110898643470439615042",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-g51c8%40nuxt3todo.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

export default function firebaseServer() {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(configs as ServiceAccount)
    });
  }
};
