import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import gmailImg from "@/assets/gmail-icon.png";
import outlookImg from "@/assets/outlook-icon.png";

// Array of tab data containing headings, strong texts, and normal text
const tabData = [
  {
    value: "gmail",
    label: "Gmail",
    img: gmailImg,
    badge: null,
    content: [
      {
        type: "heading",
        text: "Setting Up Email Forwarding in Gmail",
        fontWeight: "font-semibold",
      },
      {
        type: "normal",
        text: "Follow these steps to set up email forwarding in Gmail:",
      },
      {
        type: "strong",
        text: "Log in to Gmail:",
        description:
          "Open your web browser and go to http://gmail.com. Enter the email address and password for the account from which you want to forward emails.",
      },
      {
        type: "strong",
        text: "Access Settings:",
        description:
          "Once logged in, click on the Settings gear icon located in the top-right corner of the page.",
      },
      {
        type: "strong",
        text: "See all settings:",
        description: "From the dropdown menu, select 'See all settings'.",
      },
      {
        type: "strong",
        text: "Navigate to Forwarding and POP/IMAP:",
        description:
          "In the Settings menu, click on the 'Forwarding and POP/IMAP' tab.",
      },
      {
        type: "strong",
        text: "Add a forwarding address:",
        description:
          "In the 'Forwarding' section, click on the 'Add a forwarding address' button.",
      },
      {
        type: "strong",
        text: "Enter the forwarding email:",
        description:
          "A pop-up window will appear. Type '<FORWARDED_EMAIL>' into the field and click 'Next'.",
      },
      {
        type: "strong",
        text: "Proceed to verification:",
        description:
          "Another pop-up will appear to confirm. Click 'Proceed'. Gmail will then send a verification email to '<FORWARDED_EMAIL>'.",
      },
      {
        type: "strong",
        text: "Verify the forwarding address:",
        description:
          "Log in to the '<FORWARDED_EMAIL>' email account. Open the verification email from Gmail. Click on the verification link within the email.",
      },
      {
        type: "strong",
        text: "Return to Gmail settings:",
        description:
          "Go back to the settings page of the Gmail account you are forwarding *from*. You might need to refresh the browser.",
      },
      {
        type: "strong",
        text: "Enable forwarding:",
        description:
          "Under the 'Forwarding and POP/IMAP' tab, in the 'Forwarding' section, select the option 'Forward a copy of incoming mail to'. The newly verified address '<FORWARDED_EMAIL>' should be visible in the dropdown.",
      },
      {
        type: "strong",
        text: "Choose what happens to the original email:",
        description:
          "You have a few options for what Gmail should do with the original emails after forwarding them:",
      },
      {
        type: "normal-list",
        text: "keep Gmail's copy in the Inbox (recommended)",
      },
      { type: "normal-list", text: "mark Gmail's copy as read" },
      { type: "normal-list", text: "archive Gmail's copy" },
      { type: "normal-list", text: "delete Gmail's copy" },
      {
        type: "strong",
        text: "Save Changes:",
        description:
          "Scroll to the bottom of the page and click 'Save Changes'.",
      },
    ],
  },
  {
    value: "outlookNew",
    label: "Outlook",
    img: outlookImg,
    badge: (
      <Badge
        className="bg-white text-blue-700 border-blue-700"
        variant="default"
      >
        New
      </Badge>
    ),
    content: [
      {
        type: "heading",
        text: "Setting Up Email Forwarding in Outlook (New)",
        fontWeight: "font-semibold",
      },
      {
        type: "normal",
        text: "Follow these steps to set up email forwarding in the new Outlook:",
      },
      {
        type: "strong",
        text: "Log in to Outlook:",
        description:
          "Open your web browser and go to http://outlook.com. Sign in with the email address and password for the account from which you want to forward emails.",
      },
      {
        type: "strong",
        text: "Access Settings:",
        description:
          "Click on the Settings gear icon in the top-right corner of the page.",
      },
      {
        type: "strong",
        text: "View all Outlook settings:",
        description:
          "If a quick settings panel appears, click 'View all Outlook settings' or 'Mail'.",
      },
      {
        type: "strong",
        text: "Navigate to Forwarding:",
        description:
          "In the Settings menu, select 'Mail' and then choose 'Forwarding'.",
      },
      {
        type: "strong",
        text: "Enable forwarding:",
        description:
          "Check the box for 'Enable forwarding'. Enter '<FORWARDED_EMAIL>' in the 'Forward my email to' field.",
      },
      {
        type: "strong",
        text: "Keep a copy (optional):",
        description:
          "It's recommended to check 'Keep a copy of forwarded messages'.",
      },
      {
        type: "strong",
        text: "Save:",
        description: "Click the 'Save' button.",
      },
    ],
  },
  {
    value: "outlookClassic",
    label: "Outlook",
    img: outlookImg,
    badge: (
      <Badge
        className="bg-white text-blue-700 border-blue-700"
        variant="outline"
      >
        Classic
      </Badge>
    ),
    content: [
      {
        type: "heading",
        text: "Setting Up Email Forwarding in Outlook (Classic)",
        fontWeight: "font-semibold",
      },
      {
        type: "normal",
        text: "Follow these steps to set up email forwarding in Classic Outlook:",
      },
      {
        type: "strong",
        text: "Log in to Outlook:",
        description: "Open Outlook and sign in.",
      },
      {
        type: "strong",
        text: "Access Settings:",
        description: "Click the Settings gear icon in the top-right corner.",
      },
      {
        type: "strong",
        text: "Find Forwarding Options:",
        description:
          "Look for options like 'Mail' > 'Automatic processing' > 'Forwarding' or directly 'Forwarding'.",
      },
      {
        type: "strong",
        text: "Enable Forwarding:",
        description:
          "Select the option to start forwarding or enable forwarding. Enter '<FORWARDED_EMAIL>' as the forwarding address.",
      },
      { type: "strong", text: "Save Changes:", description: "Click 'Save'." },
    ],
  },
  {
    value: "outlookDesktop",
    label: "Outlook",
    img: outlookImg,
    badge: (
      <Badge
        className="bg-white  text-blue-700 border-blue-700"
        variant="outline"
      >
        Desktop
      </Badge>
    ),
    content: [
      {
        type: "heading",
        text: "Setting Up Email Forwarding in Outlook Desktop",
        fontWeight: "font-semibold",
      },
      {
        type: "normal",
        text: "Follow these steps to set up email forwarding in Outlook Desktop:",
      },
      {
        type: "strong",
        text: "Log in to Outlook Desktop:",
        description: "Open Outlook Desktop and sign in.",
      },
      {
        type: "strong",
        text: "Access Rules:",
        description:
          "On the Home tab, click on 'Rules' and 'Manage Rules & Alerts'.",
      },
      {
        type: "strong",
        text: "Create a New Rule:",
        description:
          "In the 'Rules and Alerts' dialog box, click on 'New Rule'.",
      },
      {
        type: "strong",
        text: "Start from a blank rule:",
        description: "Select 'Apply rule on messages I receive'. Click 'Next'.",
      },
      {
        type: "strong",
        text: "Set Conditions:",
        description:
          "If you want to forward all emails, do not select any conditions. Click 'Next'.",
      },
      {
        type: "strong",
        text: "Select Action:",
        description: "Check 'forward it to people or public group'.",
      },
      {
        type: "strong",
        text: "Edit the Rule Description:",
        description:
          "In the bottom box, click 'people or public group'. Type '<FORWARDED_EMAIL>' in the 'To ->' field.",
      },
      {
        type: "strong",
        text: "Set Exceptions:",
        description: "Click 'Next' if no exceptions are needed.",
      },
      {
        type: "strong",
        text: "Name the Rule:",
        description:
          "Give your rule a name (e.g., 'Forward to info@ironpeakmech'). Click 'Finish'.",
      },
      {
        type: "strong",
        text: "Apply and OK:",
        description: "Click 'Apply' and then 'OK' to finalize.",
      },
    ],
  },
];

export const SetupGuideTabs = () => {
  return (
    <CardContent className="p-6 space-y-4">
      <Tabs defaultValue="gmail">
        <TabsList className="flex space-x-2">
          {tabData.map((tab) => (
            <TabsTrigger
              className="w-[160px] bg-white text-black data-[state=active]:bg-blue-700 data-[state=active]:text-white transition"
              key={tab.value}
              value={tab.value}
            >
              <div className="flex items-center gap-1">
                <div className="w-[16px] h-[16px]">
                  <img src={tab.img} alt="logo" />
                </div>
                <span>
                  {tab.label} {tab.badge && tab.badge}
                </span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        <ul className="list-disc pl-5 space-y-1 list-inside">
          {tabData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content.map((content, index) => {
                if (content.type === "heading") {
                  return (
                    <h4 key={index} className={`${content.fontWeight} text-lg`}>
                      {content.text}
                    </h4>
                  );
                }

                if (content.type === "strong") {
                  return (
                    <li key={index} className="list-item flex gap-1 pt-2 pb-2">
                      <strong className="mr-2">{content.text}</strong>{" "}
                      {content.description}
                    </li>
                  );
                }

                if (content.type === "normal-list") {
                  return (
                    <li
                      key={index}
                      className="list-item flex gap-1 pt-2 pb-2 pl-4"
                    >
                      {content.text}
                    </li>
                  );
                }

                return (
                  <p key={index} className=" pt-4 pb-4">
                    {content.text}
                  </p>
                );
              })}
            </TabsContent>
          ))}
        </ul>
      </Tabs>
    </CardContent>
  );
};
