import nhis from "../assets/nhis.png";
import novo from "../assets/novo.png";
import axa from "../assets/axa.png";
import mercy from "../assets/mercy.png";
import avon from "../assets/avon.png";

export const frequencyOfComplaints = [
  {
    id: 1,
    title: "Claims processing errors",
    number: "60",
    reason: "Claims processing errors"
  },
  {
    id: 2,
    title: "Quality of care",
    number: "42",
    reason: "Quality of care"
  },
  {
    id: 3,
    title: "Providers network adequacy",
    number: "32",
    reason: "Providers network adequacy"
  },
  {
    id: 4,
    title: "Access to service",
    number: "25",
    reason: "Access to service"
  },
  {
    id: 5,
    title: "Billing",
    number: "20",
    reason: "Billing"
  }
];

export const complaintRespondents = [
  {
    id: 1,
    title: "NHIS",
    number: "60",
    reason: "Claims processing errors",
    icon: nhis
  },
  {
    id: 2,
    title: "Novo HMO",
    number: "42",
    reason: "Quality of care",
    icon: novo
  },
  {
    id: 3,
    title: "Axa Mansard HMO",
    number: "32",
    reason: "Providers network adequacy",
    icon: axa
  },
  {
    id: 4,
    title: "Mercy group clinics",
    number: "25",
    reason: "Access to service",
    icon: mercy
  },
  {
    id: 5,
    title: "Avon HMO",
    number: "20",
    reason: "Billing",
    icon: avon
  }
];
