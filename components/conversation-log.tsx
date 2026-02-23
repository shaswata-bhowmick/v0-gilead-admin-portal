'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Trash2, MessageSquare, Clock, Globe, Eye, Code, MessageCircle, User, Mail } from 'lucide-react'

interface Conversation {
  id: string
  date: string
  time: string
  messages: number
  duration: string
  url: string
  focus: string
  jsonData: any
  flowContent: string
  hcpId?: string
  hcpName?: string
  source: string
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    date: '2026-02-28',
    time: '11:45',
    messages: 12,
    duration: '12m 34s',
    url: 'agent.pharma.com/cardiovexra',
    focus: 'Cardiovexra Focus',
    hcpId: 'HCP-001',
    hcpName: 'Dr. Sarah Johnson',
    source: 'Oncomyra Now Approved Campaign Email',
    flowContent: `🔹 Conversation Log – Version 1 (Cardiovexra Focus)
👤 User

Hi there.

🤖 Triage Agent

Hello. How can I assist you today?

Internal Step:

Triage Agent analyzed the input

Classified as: Greeting

Response generated directly

👤 User

What was the primary endpoint of the VICTORY-HTN Phase III trial?

Internal Step:

Triage Agent analyzed the response

Intent classified as: FAQ Query

Routed to: Info Agent

🤖 Info Agent

The primary endpoint was the change from baseline in mean 24-hour ambulatory systolic blood pressure (SBP) at week 12. Cardiovexra demonstrated a significantly greater reduction compared to placebo (-18.4 mmHg vs -6.2 mmHg; difference -12.2 mmHg; P<0.001).

Documents Shared:

VICTORY-HTN Phase III Clinical Study Summary

Cardiovexra Prescribing Information (Section 14 – Clinical Studies)

👤 User

How should fluid retention be managed in patients taking Cardiovexra?

Internal Step:

Triage Agent analyzed the response

Identified as: FAQ Query

Routed to: Info Agent

🤖 Info Agent

Fluid retention (occurring in ~8.4% of patients) is usually managed by optimizing diuretic therapy. Increase the existing diuretic dose or add a thiazide. Loop diuretics may be needed for significant cases.

Documents Shared:

Cardiovexra Safety Management Guide

Edema Management Best Practices Document

👤 User

Is Cardiovexra safe in elderly patients over 75?

Internal Step:

Triage Agent analyzed the response

Identified as: FAQ Query

Routed to: Info Agent

🤖 Info Agent

Cardiovexra demonstrated consistent efficacy and safety in elderly patients. However, those over 75 may require slower titration and more frequent monitoring for hypotension and falls. Real-world data showed higher dose modification rates in this group.

Documents Shared:

Real-World Evidence Compendium

Geriatric Dosing and Monitoring Guidance

👤 User

Please submit a CAR request for updated dosing guidance materials.

Internal Step:

Triage Agent analyzed the response

Classified as: Workflow Trigger

Routed to: Task Agent

🤖 Task Agent

CAR workflow initiated.

Workflow Details:

Request Type: Medical Content Update

Topic: Cardiovexra Dosing Guidance

Status: Submitted

Ticket ID: CAR-2024-1127

Confirmation email sent to user.`,
    jsonData: {
      "conversation_id": "CONV-001",
      "agents": ["triage_agent", "info_agent", "task_agent"],
      "messages": [
        {
          "role": "user",
          "content": "Hi there."
        },
        {
          "role": "triage_agent",
          "content": "Hello. How can I assist you today?",
          "internal_steps": [
            "Triage agent analyzed the input",
            "Intent classified as Greeting",
            "Response handled directly by Triage agent"
          ]
        },
        {
          "role": "user",
          "content": "What was the primary endpoint of the VICTORY-HTN Phase III trial?"
        },
        {
          "role": "triage_agent",
          "internal_steps": [
            "Triage agent analyzed the input",
            "Intent identified as FAQ Query",
            "Routed to Info agent"
          ]
        },
        {
          "role": "info_agent",
          "content": "The primary endpoint was the change from baseline in mean 24-hour ambulatory systolic blood pressure (SBP) at week 12. Cardiovexra demonstrated a significantly greater reduction compared to placebo (-18.4 mmHg vs -6.2 mmHg; difference -12.2 mmHg; P<0.001).",
          "documents_shared": [
            "VICTORY-HTN Phase III Clinical Study Summary",
            "Cardiovexra Prescribing Information - Section 14 Clinical Studies"
          ]
        },
        {
          "role": "user",
          "content": "How should fluid retention be managed in patients taking Cardiovexra?"
        },
        {
          "role": "triage_agent",
          "internal_steps": [
            "Triage agent analyzed the input",
            "Intent identified as FAQ Query",
            "Routed to Info agent"
          ]
        },
        {
          "role": "info_agent",
          "content": "Fluid retention (occurring in ~8.4% of patients) is usually managed by optimizing diuretic therapy. Increase the existing diuretic dose or add a thiazide. Loop diuretics may be needed for significant cases.",
          "documents_shared": [
            "Cardiovexra Safety Management Guide",
            "Edema Management Best Practices Document"
          ]
        },
        {
          "role": "user",
          "content": "Please submit a CAR request for updated dosing guidance materials."
        },
        {
          "role": "triage_agent",
          "internal_steps": [
            "Triage agent analyzed the input",
            "Intent classified as Workflow Trigger",
            "Routed to Task agent"
          ]
        },
        {
          "role": "task_agent",
          "content": "CAR workflow initiated successfully.",
          "workflow_details": {
            "workflow_type": "CAR Submission",
            "topic": "Cardiovexra Dosing Guidance Update",
            "status": "Submitted",
            "ticket_id": "CAR-2024-1127"
          }
        }
      ]
    },
  },
  {
    id: '2',
    date: '2026-02-28',
    time: '09:30',
    messages: 10,
    duration: '14m 22s',
    url: 'agent.pharma.com/oncomyra',
    focus: 'Oncomyra Focus',
    hcpId: 'HCP-001',
    hcpName: 'Dr. Sarah Johnson',
    source: 'Cardiovexra Doc Locator Email',
    flowContent: `🔹 Conversation Log – Version 2 (Oncomyra Focus)
👤 User

Good morning.

🤖 Triage Agent

Good morning. How can I help you today?

Internal Step: Greeting detected → handled directly

👤 User

What is the primary indication for Oncomyra?

Internal Step:
FAQ Query → Routed to Info Agent

🤖 Info Agent

Oncomyra is indicated for the treatment of patients with metastatic cholangiocarcinoma with FGFR2 fusions who have received prior systemic therapy (2nd line or later).

Documents Shared:

Oncomyra Prescribing Information

CLARITY-01 Clinical Overview Deck

👤 User

How effective was Oncomyra in improving overall survival?

Internal Step: FAQ Query → Info Agent

🤖 Info Agent

Oncomyra significantly improved median overall survival to 12.8 months compared to 9.1 months with FOLFOX chemotherapy (HR 0.72; P=0.008), representing a 28% reduction in the risk of death.

Documents Shared:

CLARITY-01 Trial Publication

Oncology Outcomes Summary Report

👤 User

What ocular monitoring is required?

Internal Step: FAQ Query → Info Agent

🤖 Info Agent

Baseline ophthalmologic exam is required. Follow-up exams every 2 months for the first 6 months. Patients should use prophylactic artificial tears and report vision changes immediately.

Documents Shared:

Ocular Safety Monitoring Checklist

Oncology AE Management Guide

👤 User

Create a CAR request to update the ocular monitoring slide deck.

Internal Step:
Workflow Trigger → Task Agent

🤖 Task Agent

CAR workflow successfully initiated.

Request Category: Slide Deck Update

Area: Ocular Monitoring Content

Status: Submitted

Ticket ID: CAR-2024-1183`,
    jsonData: {
      "conversation_id": "CONV-002",
      "agents": ["triage_agent", "info_agent", "task_agent"],
      "messages": [
        {
          "role": "user",
          "content": "Good morning."
        },
        {
          "role": "triage_agent",
          "content": "Good morning. How can I help you today?",
          "internal_steps": [
            "Triage agent analyzed the input",
            "Intent classified as Greeting",
            "Response handled directly by Triage agent"
          ]
        },
        {
          "role": "user",
          "content": "What is the primary indication for Oncomyra?"
        },
        {
          "role": "triage_agent",
          "internal_steps": [
            "Intent identified as FAQ Query",
            "Routed to Info agent"
          ]
        },
        {
          "role": "info_agent",
          "content": "Oncomyra is indicated for the treatment of patients with metastatic cholangiocarcinoma with FGFR2 fusions who have received prior systemic therapy (2nd line or later).",
          "documents_shared": [
            "Oncomyra Prescribing Information",
            "CLARITY-01 Clinical Overview Deck"
          ]
        },
        {
          "role": "user",
          "content": "How much did Oncomyra improve overall survival?"
        },
        {
          "role": "triage_agent",
          "internal_steps": [
            "Intent identified as FAQ Query",
            "Routed to Info agent"
          ]
        },
        {
          "role": "info_agent",
          "content": "Oncomyra significantly improved median overall survival to 12.8 months compared to 9.1 months with FOLFOX chemotherapy (HR 0.72; P=0.008), representing a 28% reduction in the risk of death.",
          "documents_shared": [
            "CLARITY-01 Trial Publication",
            "Oncology Outcomes Summary Report"
          ]
        },
        {
          "role": "user",
          "content": "Create a CAR request to update the ocular monitoring slide deck."
        },
        {
          "role": "triage_agent",
          "internal_steps": [
            "Intent classified as Workflow Trigger",
            "Routed to Task agent"
          ]
        },
        {
          "role": "task_agent",
          "content": "CAR workflow successfully initiated.",
          "workflow_details": {
            "workflow_type": "CAR Submission",
            "topic": "Oncomyra Ocular Monitoring Deck Update",
            "status": "Submitted",
            "ticket_id": "CAR-2024-1183"
          }
        }
      ]
    },
  },
  {
    id: '3',
    date: '2026-02-27',
    time: '14:20',
    messages: 11,
    duration: '16m 45s',
    url: 'agent.pharma.com/portfolio',
    focus: 'Mixed Portfolio',
    hcpId: 'HCP-002',
    hcpName: 'Dr. Michael Chen',
    source: 'Oncomyra Welcome Email',
    flowContent: `🔹 Conversation Log – Version 3 (Mixed Portfolio)
👤 User

Hello.

🤖 Triage Agent

Hello. What information can I provide today?

👤 User

Can Cardiovexra be used in CKD patients?

Internal Step: FAQ Query → Info Agent

🤖 Info Agent

Yes, but dose adjustments are needed. For moderate renal impairment (eGFR 30–60 mL/min/1.73m²), start with 2.5 mg daily. It is not recommended in severe renal impairment (eGFR <30). It has a lower risk of hyperkalemia compared to MRAs in this population.

Documents Shared:

Renal Impairment Dosing Guide

Cardiovexra Clinical Pharmacology Summary

👤 User

Does Oncomyra cause QTc prolongation?

Internal Step: FAQ Query → Info Agent

🤖 Info Agent

In safety analyses, mean QTc changes were minimal (+2.1 ms) with no outliers >500 ms. Routine ECG monitoring is standard but QTc prolongation is not a major concern compared to other tyrosine kinase inhibitors.

Documents Shared:

Safety Analysis Report

ECG Monitoring Guidance

👤 User

How long should patients remain on Oncomyra?

Internal Step: FAQ Query → Info Agent

🤖 Info Agent

Treatment should continue as long as the patient derives clinical benefit (stable disease or response) and toxicity is manageable. Median duration of response was 8.9 months in trials.

Documents Shared:

Duration of Therapy Guidance

CLARITY-01 Clinical Data Extract

👤 User

Trigger CAR workflow for updated renal dosing FAQ validation.

Internal Step:
Workflow Trigger → Task Agent

🤖 Task Agent

CAR workflow initiated successfully.

Request Type: FAQ Validation

Topic: Renal Dosing

Status: Submitted

Ticket ID: CAR-2024-1211`,
    jsonData: {
      "conversation_id": "CONV-003",
      "agents": ["triage_agent", "info_agent", "task_agent"],
      "messages": [
        {
          "role": "user",
          "content": "Hello."
        },
        {
          "role": "triage_agent",
          "content": "Hello. What information can I provide today?",
          "internal_steps": [
            "Greeting detected",
            "Handled by Triage agent"
          ]
        },
        {
          "role": "user",
          "content": "Can Cardiovexra be used in CKD patients?"
        },
        {
          "role": "triage_agent",
          "internal_steps": [
            "Intent identified as FAQ Query",
            "Routed to Info agent"
          ]
        },
        {
          "role": "info_agent",
          "content": "Yes, but dose adjustments are needed. For moderate renal impairment (eGFR 30–60 mL/min/1.73m²), start with 2.5 mg daily. It is not recommended in severe renal impairment (eGFR <30). It has a lower risk of hyperkalemia compared to MRAs in this population.",
          "documents_shared": [
            "Renal Impairment Dosing Guide",
            "Clinical Pharmacology Summary"
          ]
        },
        {
          "role": "user",
          "content": "How long should patients remain on Oncomyra?"
        },
        {
          "role": "triage_agent",
          "internal_steps": [
            "Intent identified as FAQ Query",
            "Routed to Info agent"
          ]
        },
        {
          "role": "info_agent",
          "content": "Treatment should continue as long as the patient derives clinical benefit (stable disease or response) and toxicity is manageable. Median duration of response was 8.9 months in trials.",
          "documents_shared": [
            "Duration of Therapy Guidance",
            "CLARITY-01 Clinical Data Extract"
          ]
        },
        {
          "role": "user",
          "content": "Trigger CAR workflow for updated renal dosing FAQ validation."
        },
        {
          "role": "triage_agent",
          "internal_steps": [
            "Intent classified as Workflow Trigger",
            "Routed to Task agent"
          ]
        },
        {
          "role": "task_agent",
          "content": "CAR workflow initiated successfully.",
          "workflow_details": {
            "workflow_type": "CAR Submission",
            "topic": "Renal Dosing FAQ Validation",
            "status": "Submitted",
            "ticket_id": "CAR-2024-1211"
          }
        }
      ]
    },
  },
  {
    id: '4',
    date: '2026-02-27',
    time: '10:15',
    messages: 8,
    duration: '9m 12s',
    url: 'agent.pharma.com/cardiovexra',
    focus: 'Cardiovexra Focus',
    hcpId: 'HCP-006',
    hcpName: 'Dr. Robert Anderson',
    source: 'Cardiovexra Welcome Email',
    flowContent: `👤 User\n\nWhat are the contraindications for Cardiovexra?\n\n🤖 Info Agent\n\nCardiovexra is contraindicated in patients with known hypersensitivity to the active ingredient or any excipients. It should not be used in patients with severe hepatic impairment (Child-Pugh Class C) or during pregnancy.\n\nDocuments Shared:\n- Cardiovexra Prescribing Information (Section 4)\n- Safety Profile Summary`,
    jsonData: {
      "conversation_id": "CONV-004",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "What are the contraindications for Cardiovexra?" },
        { "role": "info_agent", "content": "Cardiovexra is contraindicated in patients with known hypersensitivity to the active ingredient or any excipients.", "documents_shared": ["Cardiovexra Prescribing Information (Section 4)", "Safety Profile Summary"] }
      ]
    }
  },
  {
    id: '5',
    date: '2026-02-26',
    time: '15:45',
    messages: 6,
    duration: '7m 33s',
    url: 'agent.pharma.com/oncomyra',
    focus: 'Oncomyra Focus',
    hcpId: 'HCP-003',
    hcpName: 'Dr. Emily Rodriguez',
    source: 'Oncomyra Doc Locator Email',
    flowContent: `👤 User\n\nWhat are common side effects of Oncomyra?\n\n🤖 Info Agent\n\nThe most common adverse reactions (≥20%) include hyperphosphatemia, dry mouth, nail toxicity, fatigue, constipation, and stomatitis. Most are manageable with dose modifications and supportive care.\n\nDocuments Shared:\n- Oncomyra Safety Profile\n- Adverse Event Management Guide`,
    jsonData: {
      "conversation_id": "CONV-005",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "What are common side effects of Oncomyra?" },
        { "role": "info_agent", "content": "The most common adverse reactions include hyperphosphatemia, dry mouth, nail toxicity, fatigue.", "documents_shared": ["Oncomyra Safety Profile"] }
      ]
    }
  },
  {
    id: '6',
    date: '2026-02-26',
    time: '13:20',
    messages: 9,
    duration: '11m 05s',
    url: 'agent.pharma.com/cardiovexra',
    focus: 'Cardiovexra Focus',
    hcpId: 'HCP-002',
    hcpName: 'Dr. Michael Chen',
    source: 'Cardiovexra Webinar Email',
    flowContent: `👤 User\n\nHow should I dose Cardiovexra in patients with hepatic impairment?\n\n🤖 Info Agent\n\nFor mild hepatic impairment (Child-Pugh A), no dose adjustment needed. For moderate impairment (Child-Pugh B), reduce dose to 2.5mg daily. Cardiovexra is not recommended in severe hepatic impairment.\n\nDocuments Shared:\n- Hepatic Impairment Dosing Guidelines\n- Clinical Pharmacology Data`,
    jsonData: {
      "conversation_id": "CONV-006",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "How should I dose Cardiovexra in patients with hepatic impairment?" },
        { "role": "info_agent", "content": "For mild hepatic impairment, no dose adjustment needed. For moderate, reduce to 2.5mg daily.", "documents_shared": ["Hepatic Impairment Dosing Guidelines"] }
      ]
    }
  },
  {
    id: '7',
    date: '2026-02-25',
    time: '16:50',
    messages: 7,
    duration: '8m 41s',
    url: 'agent.pharma.com/oncomyra',
    focus: 'Oncomyra Focus',
    hcpId: 'HCP-003',
    hcpName: 'Dr. Emily Rodriguez',
    source: 'Oncomyra Now Approved Campaign Email',
    flowContent: `👤 User\n\nCan Oncomyra be used with other cancer therapies?\n\n🤖 Info Agent\n\nOncomyra is typically used as monotherapy in second-line or later treatment. Combination with other anticancer agents has not been extensively studied. Consult the prescribing information for drug interaction data.\n\nDocuments Shared:\n- Oncomyra Drug Interactions\n- Clinical Trial Design Summary`,
    jsonData: {
      "conversation_id": "CONV-007",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "Can Oncomyra be used with other cancer therapies?" },
        { "role": "info_agent", "content": "Oncomyra is typically used as monotherapy. Combination use not extensively studied.", "documents_shared": ["Oncomyra Drug Interactions"] }
      ]
    }
  },
  {
    id: '8',
    date: '2026-02-25',
    time: '11:30',
    messages: 10,
    duration: '13m 18s',
    url: 'agent.pharma.com/portfolio',
    focus: 'Mixed Portfolio',
    hcpId: 'HCP-007',
    hcpName: 'Dr. Patricia Lee',
    source: 'Cardiovexra Doc Locator Email',
    flowContent: `👤 User\n\nWhat is the mechanism of action for Cardiovexra?\n\n🤖 Info Agent\n\nCardiovexra is a selective endothelin receptor antagonist that blocks both ETA and ETB receptors, reducing vasoconstriction and promoting vasodilation to lower blood pressure.\n\nDocuments Shared:\n- Cardiovexra Mechanism of Action Overview\n- Pharmacodynamics Summary`,
    jsonData: {
      "conversation_id": "CONV-008",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "What is the mechanism of action for Cardiovexra?" },
        { "role": "info_agent", "content": "Cardiovexra is a selective endothelin receptor antagonist.", "documents_shared": ["Cardiovexra Mechanism of Action Overview"] }
      ]
    }
  },
  {
    id: '9',
    date: '2026-02-24',
    time: '14:00',
    messages: 11,
    duration: '15m 27s',
    url: 'agent.pharma.com/cardiovexra',
    focus: 'Cardiovexra Focus',
    hcpId: 'HCP-006',
    hcpName: 'Dr. Robert Anderson',
    source: 'Oncomyra Welcome Email',
    flowContent: `👤 User\n\nWhat monitoring is required for patients on Cardiovexra?\n\n🤖 Info Agent\n\nRegular monitoring includes blood pressure checks, liver function tests monthly for the first 3 months then quarterly, and assessment for signs of fluid retention. Monitor hemoglobin levels in patients at risk for anemia.\n\nDocuments Shared:\n- Cardiovexra Monitoring Protocol\n- Laboratory Test Guidelines`,
    jsonData: {
      "conversation_id": "CONV-009",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "What monitoring is required for patients on Cardiovexra?" },
        { "role": "info_agent", "content": "Regular BP checks, liver function tests monthly for first 3 months.", "documents_shared": ["Cardiovexra Monitoring Protocol"] }
      ]
    }
  },
  {
    id: '10',
    date: '2026-02-24',
    time: '09:45',
    messages: 8,
    duration: '10m 08s',
    url: 'agent.pharma.com/oncomyra',
    focus: 'Oncomyra Focus',
    hcpId: 'HCP-004',
    hcpName: 'Dr. James Wilson',
    source: 'Cardiovexra Webinar Email',
    flowContent: `👤 User\n\nHow is FGFR2 fusion status determined?\n\n🤖 Info Agent\n\nFGFR2 fusion or rearrangement status should be determined using an FDA-approved companion diagnostic test. Next-generation sequencing (NGS) of tumor tissue is the preferred method.\n\nDocuments Shared:\n- FGFR2 Testing Guidelines\n- Companion Diagnostic Information`,
    jsonData: {
      "conversation_id": "CONV-010",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "How is FGFR2 fusion status determined?" },
        { "role": "info_agent", "content": "Use FDA-approved companion diagnostic. NGS of tumor tissue preferred.", "documents_shared": ["FGFR2 Testing Guidelines"] }
      ]
    }
  },
  {
    id: '11',
    date: '2026-02-23',
    time: '16:25',
    messages: 9,
    duration: '12m 44s',
    url: 'agent.pharma.com/cardiovexra',
    focus: 'Cardiovexra Focus',
    hcpId: 'HCP-001',
    hcpName: 'Dr. Sarah Johnson',
    source: 'Oncomyra Doc Locator Email',
    flowContent: `👤 User\n\nCan Cardiovexra be used in pregnancy?\n\n🤖 Info Agent\n\nCardiovexra is contraindicated in pregnancy due to potential fetal harm. Women of childbearing potential should use effective contraception during treatment and for one month after discontinuation.\n\nDocuments Shared:\n- Cardiovexra Pregnancy and Lactation Information\n- Contraception Guidance`,
    jsonData: {
      "conversation_id": "CONV-011",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "Can Cardiovexra be used in pregnancy?" },
        { "role": "info_agent", "content": "Cardiovexra is contraindicated in pregnancy. Effective contraception required.", "documents_shared": ["Cardiovexra Pregnancy Information"] }
      ]
    }
  },
  {
    id: '12',
    date: '2026-02-23',
    time: '12:10',
    messages: 7,
    duration: '9m 55s',
    url: 'agent.pharma.com/oncomyra',
    focus: 'Oncomyra Focus',
    hcpId: 'HCP-005',
    hcpName: 'Dr. Lisa Martinez',
    source: 'Oncomyra Welcome Email',
    flowContent: `👤 User\n\nWhat should patients do if they miss an Oncomyra dose?\n\n🤖 Info Agent\n\nIf a dose is missed, patients should take it as soon as remembered on the same day. If more than 12 hours late, skip the missed dose and resume the regular schedule. Do not double dose.\n\nDocuments Shared:\n- Oncomyra Patient Administration Guide\n- Dosing Instructions`,
    jsonData: {
      "conversation_id": "CONV-012",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "What should patients do if they miss an Oncomyra dose?" },
        { "role": "info_agent", "content": "Take as soon as remembered same day. If >12 hours late, skip and resume schedule.", "documents_shared": ["Oncomyra Patient Guide"] }
      ]
    }
  },
  {
    id: '13',
    date: '2026-02-22',
    time: '15:35',
    messages: 12,
    duration: '17m 11s',
    url: 'agent.pharma.com/portfolio',
    focus: 'Mixed Portfolio',
    hcpId: 'HCP-007',
    hcpName: 'Dr. Patricia Lee',
    source: 'Cardiovexra Welcome Email',
    flowContent: `👤 User\n\nAre there any food interactions with Cardiovexra?\n\n🤖 Info Agent\n\nCardiovexra can be taken with or without food. However, consistent administration with regards to meals is recommended to maintain stable drug levels.\n\nDocuments Shared:\n- Cardiovexra Administration Guidelines\n- Food Interaction Data`,
    jsonData: {
      "conversation_id": "CONV-013",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "Are there any food interactions with Cardiovexra?" },
        { "role": "info_agent", "content": "Can be taken with or without food. Consistent administration recommended.", "documents_shared": ["Cardiovexra Administration Guidelines"] }
      ]
    }
  },
  {
    id: '14',
    date: '2026-02-22',
    time: '10:50',
    messages: 8,
    duration: '11m 22s',
    url: 'agent.pharma.com/oncomyra',
    focus: 'Oncomyra Focus',
    hcpId: 'HCP-004',
    hcpName: 'Dr. James Wilson',
    source: 'Oncomyra Now Approved Campaign Email',
    flowContent: `👤 User\n\nWhat is the recommended dose of Oncomyra?\n\n🤖 Info Agent\n\nThe recommended dose is 16 mg orally once daily until disease progression or unacceptable toxicity. Take on an empty stomach, at least 1 hour before or 2 hours after a meal.\n\nDocuments Shared:\n- Oncomyra Dosing and Administration\n- Prescribing Information (Section 2)`,
    jsonData: {
      "conversation_id": "CONV-014",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "What is the recommended dose of Oncomyra?" },
        { "role": "info_agent", "content": "16 mg orally once daily. Take on empty stomach.", "documents_shared": ["Oncomyra Dosing Guide"] }
      ]
    }
  },
  {
    id: '15',
    date: '2026-02-21',
    time: '14:15',
    messages: 10,
    duration: '13m 50s',
    url: 'agent.pharma.com/cardiovexra',
    focus: 'Cardiovexra Focus',
    hcpId: 'HCP-002',
    hcpName: 'Dr. Michael Chen',
    source: 'Cardiovexra Doc Locator Email',
    flowContent: `👤 User\n\nHow quickly does Cardiovexra lower blood pressure?\n\n🤖 Info Agent\n\nBlood pressure reduction with Cardiovexra is typically observed within 2-4 weeks of treatment initiation. Maximum effects are usually seen at 8-12 weeks of therapy.\n\nDocuments Shared:\n- Cardiovexra Pharmacodynamics\n- Time to Effect Analysis`,
    jsonData: {
      "conversation_id": "CONV-015",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "How quickly does Cardiovexra lower blood pressure?" },
        { "role": "info_agent", "content": "BP reduction within 2-4 weeks. Maximum effect at 8-12 weeks.", "documents_shared": ["Cardiovexra Pharmacodynamics"] }
      ]
    }
  },
  {
    id: '16',
    date: '2026-02-21',
    time: '11:05',
    messages: 9,
    duration: '12m 33s',
    url: 'agent.pharma.com/oncomyra',
    focus: 'Oncomyra Focus',
    hcpId: 'HCP-005',
    hcpName: 'Dr. Lisa Martinez',
    source: 'Cardiovexra Webinar Email',
    flowContent: `👤 User\n\nWhat are the phosphate management strategies for Oncomyra?\n\n🤖 Info Agent\n\nHyperphosphatemia management includes phosphate binders, dietary phosphate restriction, and dose modifications if levels remain elevated despite interventions. Monitor serum phosphate every 2 weeks for first 3 months.\n\nDocuments Shared:\n- Hyperphosphatemia Management Protocol\n- Oncomyra Dose Modification Guidelines`,
    jsonData: {
      "conversation_id": "CONV-016",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "What are the phosphate management strategies for Oncomyra?" },
        { "role": "info_agent", "content": "Use phosphate binders, dietary restriction, dose modifications.", "documents_shared": ["Hyperphosphatemia Protocol"] }
      ]
    }
  },
  {
    id: '17',
    date: '2026-02-20',
    time: '16:40',
    messages: 11,
    duration: '15m 19s',
    url: 'agent.pharma.com/portfolio',
    focus: 'Mixed Portfolio',
    hcpId: 'HCP-003',
    hcpName: 'Dr. Emily Rodriguez',
    source: 'Cardiovexra Welcome Email',
    flowContent: `👤 User\n\nCan Cardiovexra be combined with ACE inhibitors?\n\n🤖 Info Agent\n\nYes, Cardiovexra can be used in combination with ACE inhibitors or ARBs. However, monitor blood pressure carefully to avoid excessive hypotension, especially during treatment initiation.\n\nDocuments Shared:\n- Cardiovexra Drug Combination Studies\n- Antihypertensive Combination Therapy Guide`,
    jsonData: {
      "conversation_id": "CONV-017",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "Can Cardiovexra be combined with ACE inhibitors?" },
        { "role": "info_agent", "content": "Yes, can be combined. Monitor BP carefully for hypotension.", "documents_shared": ["Cardiovexra Combination Studies"] }
      ]
    }
  },
  {
    id: '18',
    date: '2026-02-20',
    time: '13:25',
    messages: 8,
    duration: '10m 47s',
    url: 'agent.pharma.com/oncomyra',
    focus: 'Oncomyra Focus',
    hcpId: 'HCP-008',
    hcpName: 'Dr. Thomas Wright',
    source: 'Oncomyra Doc Locator Email',
    flowContent: `👤 User\n\nWhat are the storage requirements for Oncomyra?\n\n🤖 Info Agent\n\nStore Oncomyra at room temperature (20-25°C or 68-77°F). Keep in original container to protect from moisture. Do not remove desiccant. Keep out of reach of children.\n\nDocuments Shared:\n- Oncomyra Storage and Handling\n- Patient Information Leaflet`,
    jsonData: {
      "conversation_id": "CONV-018",
      "agents": ["info_agent"],
      "messages": [
        { "role": "user", "content": "What are the storage requirements for Oncomyra?" },
        { "role": "info_agent", "content": "Store at room temperature in original container. Protect from moisture.", "documents_shared": ["Oncomyra Storage Guide"] }
      ]
    }
  },
]

export default function ConversationLog() {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [viewMode, setViewMode] = useState<'flow' | 'code'>('flow')

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this conversation?')) {
      setConversations(conversations.filter((conv) => conv.id !== id))
    }
  }

  // Group conversations by HCP
  const groupedConversations = conversations.reduce((acc, conv) => {
    const key = conv.hcpId || conv.hcpName || 'unidentified'
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(conv)
    return acc
  }, {} as Record<string, Conversation[]>)

  return (
    <div className="space-y-4">
      {Object.entries(groupedConversations).map(([hcpKey, hcpConversations]) => {
        const isStacked = hcpConversations.length > 1
        
        return (
          <div key={hcpKey} className="relative">
            {/* Stacked card effect */}
            {isStacked && (
              <>
                <div className="absolute top-1 left-2 right-2 h-full bg-gray-100 border border-gray-200 rounded-lg -z-10" />
                <div className="absolute top-2 left-4 right-4 h-full bg-gray-50 border border-gray-100 rounded-lg -z-20" />
              </>
            )}
            
            {/* Render each conversation in the group */}
            <div className="space-y-3">
              {hcpConversations.map((conversation, index) => (
        <Card key={conversation.id} className="border-border hover:shadow-md transition-shadow relative z-0">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {conversation.focus}
                  </span>
                  
                  {/* HCP ID Tag */}
                  {conversation.hcpId && conversation.hcpName ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      <User className="w-3 h-3" />
                      {conversation.hcpId} - {conversation.hcpName}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      <User className="w-3 h-3" />
                      Unidentified
                    </span>
                  )}
                  
                  {/* Source Tag */}
                  <span className="inline-flex items-center gap-1 text-xs font-medium bg-teal-100 text-teal-800 px-2 py-1 rounded">
                    <Mail className="w-3 h-3" />
                    {conversation.source}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{conversation.date} at {conversation.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    <span>{conversation.messages} messages</span>
                  </div>
                  <div className="text-muted-foreground">Duration: {conversation.duration}</div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <span className="truncate">{conversation.url}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedConversation(conversation)
                    setViewMode('flow')
                  }}
                  className="text-primary hover:text-primary/80 hover:bg-primary/10"
                  title="View conversation"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(conversation.id)}
                  className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                  title="Delete conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
            </div>
          </div>
        )
      })}

      <Dialog open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Conversation Flow</h2>
              {selectedConversation && (
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedConversation.date} at {selectedConversation.time} • {selectedConversation.url}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant={viewMode === 'flow' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('flow')}
                className="gap-1"
              >
                <MessageCircle className="w-4 h-4" />
                Flow
              </Button>
              <Button
                variant={viewMode === 'code' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('code')}
                className="gap-1"
              >
                <Code className="w-4 h-4" />
                Code
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {selectedConversation && viewMode === 'flow' && (
              <div className="space-y-4 p-4">
                {selectedConversation.jsonData.messages.map((msg: any, idx: number) => (
                  <div key={idx} className="space-y-2">
                    {msg.role === 'user' ? (
                      <div className="flex justify-end">
                        <div className="text-white rounded-lg px-4 py-2 max-w-sm bg-blue-800">
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ) : msg.internal_steps ? (
                      <div className="flex justify-start">
                        <div className="bg-amber-50 border-l-4 border-amber-300 px-4 py-2 max-w-sm rounded">
                          <p className="text-xs font-semibold text-amber-900 mb-1">Internal Processing</p>
                          <ul className="text-xs text-amber-800 space-y-0.5">
                            {msg.internal_steps.map((step: string, i: number) => (
                              <li key={i}>• {step}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-start">
                        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 max-w-sm">
                          <p className="text-xs font-semibold text-green-900 mb-2 capitalize">
                            {msg.role.replace('_', ' ')} Agent
                          </p>
                          <p className="text-sm text-foreground mb-3">{msg.content}</p>
                          {msg.documents_shared && msg.documents_shared.length > 0 && (
                            <div className="border-t border-green-200 pt-2 mt-2">
                              <p className="text-xs font-semibold text-green-900 mb-1">Documents Shared:</p>
                              <ul className="text-xs text-green-800 space-y-0.5">
                                {msg.documents_shared.map((doc: string, i: number) => (
                                  <li key={i}>• {doc}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {msg.workflow_details && (
                            <div className="border-t border-green-200 pt-2 mt-2">
                              <p className="text-xs font-semibold text-green-900 mb-1">Workflow:</p>
                              <div className="text-xs text-green-800 space-y-0.5">
                                <p>Type: {msg.workflow_details.workflow_type}</p>
                                <p>Topic: {msg.workflow_details.topic}</p>
                                <p>Status: {msg.workflow_details.status}</p>
                                <p>Ticket: {msg.workflow_details.ticket_id}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {selectedConversation && viewMode === 'code' && (
              <pre className="bg-slate-950 text-slate-50 p-4 rounded text-xs overflow-x-auto font-mono whitespace-pre-wrap break-words">
                {JSON.stringify(selectedConversation.jsonData, null, 2)}
              </pre>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
