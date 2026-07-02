export const typeData = [
  {
    id: 1,
    label:
      "Discrimination and refusal to treat/manage any enrollees and their covered dependents after receiving payment from the relevant HMOs on behalf of such enrollees.",
    value:
      "Discrimination and refusal to treat/manage any enrollees and their covered dependents after receiving payment from the relevant HMOs on behalf of such enrollees.",
  },
  {
    id: 2,
    label: "Receipt and management of any enrollee as a fee-paying patient.",
    value: "Receipt and management of any enrollee as a fee-paying patient.",
  },
  {
    id: 3,
    label:
      "Solicitation, collection, or charging any fee from any enrollee in addition to the fees payable by NIS, except for 10% co-payment for prescribed drugs.",
    value:
      "Solicitation, collection, or charging any fee from any enrollee in addition to the fees payable by NIS, except for 10% co-payment for prescribed drugs.",
  },
  {
    id: 3,
    label: "Not operating 24 hours a day, 7 days a week.",
    value: "Not operating 24 hours a day, 7 days a week.",
  },
  {
    id: 4,
    label:
      "Failure to refer an enrollee promptly to appropriate health care facilities accredited by the scheme",
    value:
      "Failure to refer an enrollee promptly to appropriate health care facilities accredited by the scheme",
  },
  {
    id: 5,
    label:
      "Failure to keep and maintain standard medical records in respect to each or all enrollees, and/or failure to make monthly returns to the HMO or its duly authorized agents.",
    value:
      "Failure to keep and maintain standard medical records in respect to each or all enrollees, and/or failure to make monthly returns to the HMO or its duly authorized agents.",
  },
  {
    id: 6,
    label:
      "Failure to permit NHIS officers and representative of the HMO the right to enter upon any part of the premises for the purpose of inspection and monitoring of facilities for quality assurance.",
    value:
      "Failure to permit NHIS officers and representative of the HMO the right to enter upon any part of the premises for the purpose of inspection and monitoring of facilities for quality assurance.",
  },
  {
    id: 7,
    label:
      "Failure to duly notify the scheme, the Enrollees registered with it and HMO’s within 3 monts of its intention to relocate to a new place by way of pulication in the national newspapers",
    value:
      "Failure to duly notify the scheme, the Enrollees registered with it and HMO’s within 3 monts of its intention to relocate to a new place by way of pulication in the national newspapers",
  },
  {
    id: 8,
    label:
      "Breach of the 3 months written notice to the scheme, and also fails to publish in the national newspapers, notify the enrollees registered with it and the HMOs of it intention to exit from the scheme",
    value:
      "Breach of the 3 months written notice to the scheme, and also fails to publish in the national newspapers, notify the enrollees registered with it and the HMOs of it intention to exit from the scheme",
  },
  {
    id: 9,
    label: "Refusal to abide by the judgements of the arbitration board",
    value: "Refusal to abide by the judgements of the arbitration board",
  },
  {
    id: 10,
    label:
      "Making false claims to the HMOs for a treatment/ procedure not carried out",
    value:
      "Making false claims to the HMOs for a treatment/ procedure not carried out",
  },
  {
    id: 11,
    label: "Deliberately and against medical ethics undermanaging an enrollee",
    value: "Deliberately and against medical ethics undermanaging an enrollee",
  },
  {
    id: 12,
    label: "Engaging in any fraudulent activity",
    value: "Engaging in any fraudulent activity",
  },
  {
    id: 13,
    label:
      "Misrepresentation on the part of health care facility at time of application",
    value:
      "Misrepresentation on the part of health care facility at time of application ",
  },
  {
    id: 14,
    label:
      "Specified NHIS technical / personnel requirements are no longer being met",
    value:
      "Specified NHIS technical / personnel requirements are no longer being met",
  },
  {
    id: 15,
    label:
      "Deliberately and against medical ethics divulging information about patients",
    value:
      "Deliberately and against medical ethics divulging information about patients",
  },
];

export const complaintType = [
  {
    value: "Financial",
    label: "Financial",
  },
  {
    value: "Operational",
    label: "Operational",
  },
  {
    value: "Service Delivery",
    label: "Service Delivery",
  },
  {
    value: "Relationship",
    label: "Relationship",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const complaintCategories = [
  {
    value: "Access",
    label: "Access",
  },
  {
    value: "Abuse",
    label: "Abuse",
  },
  {
    value: "Billing",
    label: "Billing",
  },
  {
    value: "Administrative",
    label: "Administrative",
  },
  {
    value: "Referral",
    label: "Referral",
  },
  {
    value: "Fraud",
    label: "Fraud",
  },
  {
    value: "Quality of Care",
    label: "Quality of Care",
  },
  {
    value: "Staffing and Resources",
    label: "Staffing and Resources",
  },
  {
    value: "Communication",
    label: "Communication",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const nhiaProgram = [
  {
    id: 1,
    value: "Individual",
    label: "Individual",
  },
  {
    id: 2,
    value: "Family",
    label: "Family",
  },
  {
    id: 3,
    value: "Group",
    label: "Group",
  },
  {
    id: 4,
    value: "Formal Sector Programme",
    label: "Formal Sector Programme",
  },
  {
    id: 5,
    value: "Organised Private Sector",
    label: "Organised Private Sector",
  },
  {
    id: 6,
    value: "GIFSHIP",
    label: "GIFSHIP",
  },
  {
    id: 7,
    value: "BHCPF",
    label: "BHCPF",
  },
  {
    id: 8,
    value: "Others - Equity Programs, Private Health Plans",
    label: "Others - Equity Programs, Private Health Plans",
  },
];

export const providerComplaints = [
  {
    description:
      "Refusal to treat/manage any enrollees and their covered dependents after receiving payments from the relevant HMOs on behalf of such enrollees.",
    complaint_type: "Service Delivery",
    complaint_category: "Access",
    priority: "Top",
  },
  {
    description: "Discrimination against NHIA Patients.",
    complaint_type: "Relationship",
    complaint_category: "Abuse",
    priority: "Top",
  },
  {
    description:
      "Receipt and management of any enrollee as a fee-paying patient.",
    complaint_type: "Financial",
    complaint_category: "Billing",
    priority: "Top",
  },
  {
    description:
      "Solicitation, collection, or charging any fee from any enrollee in addition to the fees payable by NHIA, except for a 10% co-payment for prescribed drugs.",
    complaint_type: "Financial",
    complaint_category: "Billing",
    priority: "Top",
  },
  {
    description: "Not operating 24 hours a day, 7 days a week.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description: "Refusal to refer.",
    complaint_type: "Service Delivery",
    complaint_category: "Referral",
    priority: "Top",
  },
  {
    description:
      "Referring an enrollee elsewhere for a service for which the Facility is accredited to render.",
    complaint_type: "Service Delivery",
    complaint_category: "Referral",
    priority: "Top",
  },
  {
    description:
      "Failure to keep and maintain standard medical records in respect of each or all enrollees.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description:
      "Failure to permit NHIA officers and representatives of the HMO the right to enter any part of the premises for inspection and monitoring of facilities for quality assurance.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description:
      "Failure to duly notify the Authority, the enrollees registered with it, and HMOs within 3 months of its intention to relocate to a new place by publication in the National newspapers.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description:
      "Breach of the 3 months written notice to the Authority, and failure to publish in the National newspapers, notify the enrollees registered with it and the HMOs of its intention to exit from the Authority.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description:
      "Making false claims to the HMOs for a treatment/procedure not carried out.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "High",
  },
  {
    description:
      "Deliberately and against medical ethics under-managing an enrollee.",
    complaint_type: "Service Delivery",
    complaint_category: "Quality of Care",
    priority: "Top",
  },
  {
    description: "Engaging in any fraudulent activity.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Medium",
  },
  {
    description:
      "Misrepresentation on the part of the Health care Facility at the time of application.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Medium",
  },
  {
    description:
      "Specified NHIA technical/ personnel requirements are no longer being met.",
    complaint_type: "Operational",
    complaint_category: "Staffing & Resources",
    priority: "Top",
  },
  {
    description:
      "Breach of confidentiality and privacy - Deliberately and against medical ethics divulging information about patients.",
    complaint_type: "Relationship",
    complaint_category: "Communication",
    priority: "Medium",
  },
  {
    description:
      "Failure to make monthly returns to the NHIA or its duly authorized agents.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description:
      "Denial of emergency care to enrollees who are out-of-station or not primarily registered in the Facility.",
    complaint_type: "Service Delivery",
    complaint_category: "Access",
    priority: "Top",
  },
  {
    description: "Failure to submit claims within the stipulated period.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description:
      "Failure to make adequate alternative arrangements for the provision of service/drugs during strike/industrial action or out-of-stock.",
    complaint_type: "Service Delivery",
    complaint_category: "Access",
    priority: "Top",
  },
  {
    description: "Refusal to dispense medications",
    complaint_type: "Service Delivery",
    complaint_category: "Access",
    priority: "Top",
  },
  {
    description:
      "Failure to issue a receipt of payments received/LONI to HMOs.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description:
      "Failure to comply with sanctions within 30 days of the imposition of the sanctions.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description:
      "Non-adherence to drug and professional service tariffs during billing/claims preparation.",
    complaint_type: "Financial",
    complaint_category: "Billing",
    priority: "High",
  },
  {
    description: "Non-adherence to the referral protocol/procedure.",
    complaint_type: "Service Delivery",
    complaint_category: "Referral",
    priority: "Top",
  },
  {
    description: "Refusal to procure professional indemnity insurance cover.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description:
      "Refusal to honor invitations or respond to correspondences from NHIA.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description: "Absent medium for grievance redress.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description: "Absence of an effective NHIA Desk Office.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description: "Unauthorized sharing of health insurance information data.",
    complaint_type: "Relationship",
    complaint_category: "Abuse",
    priority: "Medium",
  },
  {
    description: "Non-compliance with recommended ICT specifications.",
    complaint_type: "Operational",
    complaint_category: "Staffing & Resources",
    priority: "Medium",
  },
  {
    description:
      "Assault / inappropriate or aggressive behaviour of provider on enrollee.",
    complaint_type: "Relationship",
    complaint_category: "Abuse",
    priority: "Medium",
  },
  {
    description:
      "Delay in accessing care (waiting time, diagnoses, treatment, etc.) beyond the specified time in the Standard Treatment Protocol.",
    complaint_type: "Service Delivery",
    complaint_category: "Access",
    priority: "Top",
  },
  {
    description:
      "Problems with the coordination of treatment in different services by clinical staff",
    complaint_type: "Service Delivery",
    complaint_category: "Quality of Care",
    priority: "Top",
  },
  {
    description:
      "Refusal to adhere to patient safety measures as specified in the Standard Treatment Protocol.",
    complaint_type: "Service Delivery",
    complaint_category: "Quality of Care",
    priority: "Top",
  },
  {
    description:
      "Refusal to obtain enrollees’ consent or consent not adequately explained.",
    complaint_type: "Relationship",
    complaint_category: "Communication",
    priority: "High",
  },
  {
    description:
      "Poor Provider-Stakeholder communication wherein deficient or wrong information is communicated.",
    complaint_type: "Relationship",
    complaint_category: "Communication",
    priority: "High",
  },
  {
    description: "Delay in remitting payments",
    complaint_type: "Financial",
    complaint_category: "Billing",
    priority: "High",
  },
  {
    description: "Delay in authorising referral",
    complaint_type: "Service Delivery",
    complaint_category: "Referral",
    priority: "Top",
  },
  {
    description: "Denial of code",
    complaint_type: "Financial",
    complaint_category: "Billing",
    priority: "High",
  },
  {
    description: "Refusal to authorise referral",
    complaint_type: "Service Delivery",
    complaint_category: "Referral",
    priority: "Top",
  },
  {
    description: "Non-compliance with directive/agreement/sanction",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description: "Fraudulent activity",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "High",
  },
  {
    description:
      "Inappropriate/Aggressive behaviour by personnel on any other stakeholder",
    complaint_type: "Relationship",
    complaint_category: "Abuse",
    priority: "Medium",
  },
  {
    description: "Non-compliance with Claims Management portal",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description: "Others",
    complaint_type: "Other",
    complaint_category: "Other",
    priority: "Medium",
  },
];

export const hmoComplaints = [
  {
    description:
      "Refusal to remit appropriate payments (capitation, Fee-For-Service or other funds) due to Facilities within the specified period indicated in the Operational Guidelines or contracts.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Top",
  },
  {
    description: "Deliberate issuance of Dud cheque(s).",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Top",
  },
  {
    description:
      "Failure to conduct Quality Assurance in all facilities under their network annually.",
    complaint_type: "Service Delivery",
    complaint_category: "Quality of Care",
    priority: "Medium",
  },
  {
    description:
      "Authorization approval for referrals is not made by a licensed medical doctor.",
    complaint_type: "Service Delivery",
    complaint_category: "Referrals",
    priority: "Medium",
  },
  {
    description:
      "Willfully or negligently refuses to forward the prescribed remittances as required under NHIA Operational Guidelines and appropriate notices/reminders have been sent and ignored.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Top",
  },
  {
    description:
      "Failure to submit Annual report and audited accounts to the Authority within the stipulated time allowed in the Operational Guidelines.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description:
      "Failure to permit NHIA Officers the right to enter upon any part of the Company for the purpose of examining or inspecting the facilities, books, records, files maintained in respect of each enrollees.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description:
      "Failure to duly notify the Authority, the Enrollees, Facilities within 3 months of its intention to relocate to a new place by way of publication in the National newspapers.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description:
      "Where HMO breaches the 3 months written notice to the Authority, and also fails to publish in the National newspapers, notify the enrollees and Facilities of its intention to exit from the Authority.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description:
      "Failure to enter into agreement with NHIA accredited facilities.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description: "Engagement in any fraudulent activity.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Medium",
  },
  {
    description: "False representation at time of application",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Top",
  },
  {
    description:
      "Specified NHIA technical/personnel requirements are no longer being met.",
    complaint_type: "Operational",
    complaint_category: "Staffing & Resources",
    priority: "Top",
  },
  {
    description: "The HMO is involved in direct healthcare service delivery.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Medium",
  },
  {
    description:
      "Refusal to approve a referral without any justification and/or is inaccessible to authorize referrals.",
    complaint_type: "Service Delivery",
    complaint_category: "Referrals",
    priority: "Top",
  },
  {
    description:
      "Failure to comply with sanctions/directives within 30days of the imposition of the sanction/directive/agreements.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description:
      "Non-submission of format of contract for PHI agreements by HMOs for vetting and approval",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description:
      "Refusal to settle an agreed amount after reconciliation exercise.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Medium",
  },
  {
    description:
      "Failure to refund the part of the security deposit withdrawn within 90 days.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Top",
  },
  {
    description: "Refusal to attend reconciliation exercise.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description: "Breach of contractual agreement.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Top",
  },
  {
    description:
      "Failure to obtain approval from the Authority for the contractual format of purchasing health services.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description:
      "Operating health insurance schemes without prior registration and license by the Authority.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Top",
  },
  {
    description:
      "Conducting business activity under any name which includes health scheme, medical insurance scheme etc. calculated to mislead the public.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Top",
  },
  {
    description:
      "Transfer of activities or joint operations by schemes without approval from the Authority.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Medium",
  },
  {
    description: "Where HMOs de-market other HMOs.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Medium",
  },
  {
    description: "Failure to provide requested information to the Authority.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description: "Absent medium for Grievance Redress.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description:
      "Failure to provide an internal compliance process/or fail regulatory compliance assessment for three consecutive times.",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description:
      "Unauthorized disclosure of Health Insurance Information Data.",
    complaint_type: "Relationship",
    complaint_category: "Abuse",
    priority: "Medium",
  },
  {
    description: "Unauthorized marketing of a health plan.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "High",
  },
  {
    description: "Non-compliance with the ICT requirements of the Authority.",
    complaint_type: "Operational",
    complaint_category: "Staffing & Resources",
    priority: "Medium",
  },
  {
    description:
      "Failure to provide to HCFs upon payment of claims: clear narrations, payment advice, explanation of benefits form etc.",
    complaint_type: "Financial",
    complaint_category: "Billing",
    priority: "Medium",
  },
  {
    description:
      "Failure to organize sensitization seminars (at least once a quarter) for HCFs and enrollee in each of the six Geopolitical zones",
    complaint_type: "Relationship",
    complaint_category: "Communication",
    priority: "Medium",
  },
  {
    description: "Inappropriate / aggressive behaviour to HCFs / enrollees",
    complaint_type: "Relationship",
    complaint_category: "Abuse",
    priority: "Medium",
  },
  {
    description: "Delay in remitting payments",
    complaint_type: "Financial",
    complaint_category: "Billing",
    priority: "High",
  },
  {
    description: "Delay in authorization of referral",
    complaint_type: "Service Delivery",
    complaint_category: "Referral",
    priority: "Top",
  },
  {
    description: "Denial of authorization code",
    complaint_type: "Financial",
    complaint_category: "Billing",
    priority: "High",
  },
  {
    description: "Refusal to authorize referral",
    complaint_type: "Service Delivery",
    complaint_category: "Referral",
    priority: "Top",
  },
  {
    description: "Non-compliance with directive/agreement/sanction",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description: "Fraudulent activity",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "High",
  },
  {
    description:
      "Inappropriate/Aggressive behaviour by personnel on any other stakeholder",
    complaint_type: "Relationship",
    complaint_category: "Abuse",
    priority: "Medium",
  },
  {
    description: "Non-compliance with Claims Management portal",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description: "Others",
    complaint_type: "Other",
    complaint_category: "Other",
    priority: "Medium",
  },
];

export const enrolleeComplaints = [
  {
    description: "Failure to obtain Health Insurance cover.",
    complaint_type: "Service Delivery",
    complaint_category: "Access",
    priority: "Top",
  },
  {
    description:
      "Willfully or intentionally engages in multiple enrolment/registration.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Top",
  },
  {
    description: "Falsification of personal/medical records.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Top",
  },
  {
    description:
      "Willfully abet impersonation by allowing unauthorized persons the usage of NHIA ID Card to access services.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Top",
  },
  {
    description:
      "Inappropriate/aggressive behaviour including assault on personnel of NHIA/HCF/HMO or any other stakeholder.",
    complaint_type: "Relationship",
    complaint_category: "Abuse",
    priority: "Medium",
  },
  {
    description: "Engaging in any other fraudulent activity.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Medium",
  },
  {
    description:
      "Receiving free health services under the vulnerable group health insurance by persons already covered under a private health plan.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Medium",
  },
  {
    description: "A whistle-blower who gives NHIA wrong information.",
    complaint_type: "Relationship",
    complaint_category: "Communication",
    priority: "High",
  },
  {
    description:
      "Misuse of services by falsely presenting at HCFs with complaints.",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "Medium",
  },
  {
    description:
      "Willfully access services as fee-paying patients and thereafter reporting the HCF to the NHIA for redress.",
    complaint_type: "Service Delivery",
    complaint_category: "Access",
    priority: "Medium",
  },
  {
    description: "Refusal to comply with Referral Protocol.",
    complaint_type: "Service Delivery",
    complaint_category: "Referral",
    priority: "Medium",
  },
  {
    description: "Non-compliance with directive/agreement/sanction",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description: "Fraudulent activity",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "High",
  },
  {
    description: "Non-compliance with Claims Management portal",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "Medium",
  },
  {
    description: "Others",
    complaint_type: "Other",
    complaint_category: "Other",
    priority: "Medium",
  },
];

export const nhiaComplaints = [
  {
    description: "Omission of names from NHIA Register OPS & Equity Programme",
    complaint_type: "Operational",
    complaint_category: "Administrative",
    priority: "High",
  },
  {
    description: "Fraudulent activity",
    complaint_type: "Financial",
    complaint_category: "Fraud",
    priority: "High",
  },
  {
    description:
      "Inappropriate/Aggressive behaviour by personnel on any other stakeholder",
    complaint_type: "Relationship",
    complaint_category: "Abuse",
    priority: "Medium",
  },
  {
    description: "Others",
    complaint_type: "Other",
    complaint_category: "Other",
    priority: "Medium",
  },
];
