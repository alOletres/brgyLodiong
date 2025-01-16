/* eslint-disable @typescript-eslint/no-explicit-any */

import { ECERTIFICATES } from "@/constants/certificates.enum";
import { EMAGE } from "@/constants/logoBase64";
import { EPOSITION } from "@/constants/posistion.enum";
import { FindAllOfficialsDto } from "@/store/api/gen/officials";
import { FindAllRequestsDto } from "@/store/api/gen/request";
import moment from "moment";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import {
  Content,
  Margins,
  PageOrientation,
  PageSize,
  StyleDictionary,
  TDocumentDefinitions,
} from "pdfmake/interfaces";

(<any>pdfMake).vfs = pdfFonts.vfs;
(<any>pdfMake).fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
};

const styles: StyleDictionary = {
  HEADER: {
    alignment: "center",
    fontSize: 12,
  },
  LEFTHEADER: {
    alignment: "left",
    fontSize: 12,
  },
  SUB_HEADER: {
    alignment: "center",
    fontSize: 10,
  },
  COLUMN: {
    fontSize: 9,
  },
  TABLESTYLE: {
    fontSize: 8,
  },
  TABLEHEADER: {
    fillColor: "#d2d2d4",
    bold: true,
    fontSize: 8,
    alignment: "center",
  },
  FOOTERCOLUMN: {
    lineHeight: 2,
    fontSize: 8,
  },

  footerUnderline: {
    fontSize: 8,
    decoration: "overline",
    alignment: "center",
  },
};
interface IColumnSchema {
  key: string;
  label: string;
}
export interface ITable {
  columnSchema: IColumnSchema[];
  dataSource: any;
}

export interface IParagraph {
  type: `${ECERTIFICATES}`;
  pageContent: FindAllRequestsDto;
}
export interface PdfProps<T extends ITable | IParagraph> {
  pfdFor: "table" | "paragraph";
  officials?: FindAllOfficialsDto[];
  data: T;
}

const isTable = (
  props: PdfProps<ITable | IParagraph>
): props is PdfProps<ITable | IParagraph> => props.pfdFor === "table";

const isParagraph = (
  props: PdfProps<ITable | IParagraph>
): props is PdfProps<ITable | IParagraph> => props.pfdFor === "paragraph";

export const exportToPdf = (props: PdfProps<ITable | IParagraph>) => {
  const content: Content[] = [];
  const pageMargins: Margins = 40;
  const pageOrientation: PageOrientation = "portrait";
  const pageSize: PageSize = "LETTER";

  // Page Header
  const pageHeader: Content = [
    {
      columns: [
        {
          image: EMAGE.logo,
          marginTop: -10,
          // fit: [55, 55],
          width: 80,
          height: 80,
          alignment: "center",
        },
        [
          {
            text: "Republic of the Philippines",
            style: { alignment: "center" },
          },
          {
            text: "PROVINCE OF ZAMBOANGA DEL SUR",
            style: { alignment: "center" },
          },
          {
            text: "MUNICIPALITY OF TAMBULIG",
            style: { alignment: "center" },
          },
          {
            text: "BARANGAY LOWER LODIONG (POB.)",
            style: { alignment: "center", bold: true },
          },
          {
            text: "OFFICE OF THE PUNONG BARANGAY",
            style: { bold: true, alignment: "center", color: "blue" },
          },
        ],
        {
          image: EMAGE.logo1,
          marginTop: -10,
          // fit: [55, 55],
          width: 80,
          height: 80,
          alignment: "center",
        },
      ],
    },
    {
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 515, // Width of the page minus margins (LETTER size: 612pts wide, minus ~1-inch margins)
          y2: 0,
          lineWidth: 2,
          lineColor: "blue",
        },
      ],
      margin: [0, 10, 0, 10], // Adjust margins as needed
    },
  ];

  if (isTable(props)) {
    console.log("hello table");
  }

  if (isParagraph(props)) {
    const { data } = props;

    const { type: requestType, pageContent } = data as IParagraph;

    const subHeader: Content[] = [
      {
        text: `Certificate of ${requestType}`.toUpperCase().split("").join(" "),
        color: "red",
        bold: true,
        fontSize: 12,
        alignment: "center",
        margin: 20,
      },
    ];

    const paragrapAddress: Content[] = [
      {
        text: "TO WHOM IT MAY CONCERN:",
        fontSize: 12,
      },
    ];

    // Certificate purposes;

    const statement = certificatePurpose(requestType);

    const paragraphHeader: Content[] = [
      {
        marginTop: 10,
        text: [
          "This is to certify that ",
          { text: pageContent.requestedBy, bold: true }, // Bold interpolation variable
          ", of legal age, ",
          { text: pageContent.civilStatus, bold: true }, // Bold interpolation variable
          ", is a bonafide resident of ",
          { text: pageContent.address, bold: true }, // Bold interpolation variable
          statement?.first || "",
          { text: statement?.first ? requestType : "", bold: true }, // Bold interpolation variable
          statement?.second || "",
        ],
        fontSize: 12,
        lineHeight: 1.5,
      },
    ];

    const paragrapContent: Content[] = [
      {
        marginTop: 10,
        text: certificateContent(requestType) || "",
        fontSize: 12,
        lineHeight: 1.5,
      },
    ];

    const paragrapGivenDate: Content[] = [
      {
        marginTop: 10,
        marginBottom: 20,
        text: `Given this ${moment(new Date()).format(
          "Do [day of] MMMM YYYY"
        )}, at the office of the Punong Barangay, Lower Lodiong (pob.), Tambulig, Zamboanga del Sur, Philippines.`,
        fontSize: 12,
        lineHeight: 1.5,
      },
    ];

    const residenceCertificateNumber: Content[] = [
      {
        columns: [
          { text: "Res. Cert. No:", bold: true, width: 100 }, // Fixed width for label
          { text: "_____________________________", width: "auto" }, // Underline
        ],
        columnGap: 5,
        margin: [0, 0, 0, 5],
      },
      {
        columns: [
          { text: "Issued on:", bold: true, width: 100 }, // Match the width of the first label
          {
            text: `${
              pageContent?.dateCompleted
                ? moment(pageContent.dateCompleted).format("MM/DD/YYYY")
                : "_____________________________"
            }`,
            width: "auto",
          },
        ],
        columnGap: 5,
        margin: [0, 0, 0, 5],
      },
      {
        columns: [
          { text: "Issued At:", bold: true, width: 100 },
          {
            text: "LOWER LODIONG, TAMBULIG",
            decoration: "underline",
            width: "auto",
          },
        ],
        columnGap: 5,
        margin: [0, 0, 0, 5],
      },
      {
        columns: [
          { text: "Or No:", bold: true, width: 100 },
          { text: "_____________________________", width: "auto" },
        ],
        columnGap: 5,
        margin: [0, 0, 0, 5],
      },
    ];

    // Find Barangay Captain;

    const official = props.officials?.find(
      (official) => official.position === EPOSITION.PUNONG_BARANGAY
    );

    const honorableSignature: Content[] = [
      {
        text: [
          {
            text: `HON. ${official?.firstname ?? ""} ${official?.lastname}\n`,
            decoration: "underline",
            bold: true,
          },
          { text: "Punong Barangay", italics: true },
        ],
        alignment: "center",
        margin: [0, 100, 0, 0], // Adds top margin for spacing
      },
    ];

    const expiration: Content[] =
      requestType === "First Time Job Seeker"
        ? [
            {
              alignment: "center",
              marginBottom: 10,

              text: "This certification is valid only (one(1) year from the issuance).",
            },
          ]
        : [];

    // Set content here!
    content.push([
      ...pageHeader,
      ...subHeader,
      ...paragrapAddress,
      ...paragraphHeader,
      ...paragrapContent,
      ...paragrapGivenDate,
      ...expiration,
      ...residenceCertificateNumber,
      ...honorableSignature,
    ]);
  }

  const document: TDocumentDefinitions = {
    styles,
    content,
    pageMargins,
    pageOrientation,
    pageSize,
  };

  pdfMake.createPdf(document).open();
};

export const certificatePurpose = (requestType: `${ECERTIFICATES}`) => {
  switch (requestType) {
    case "Indigency":
      return {
        first: ", belongs to an ",
        second: " family.",
      };

    case "First Time Job Seeker":
      return {
        first: " is a qualified availee of RA 11261 or the ",
        second: " Act 2019. ",
      };

    default:
      return {
        first: undefined,
        second: undefined,
      };
  }
};

export const certificateContent = (requestType: `${ECERTIFICATES}`) => {
  switch (requestType) {
    case "Indigency":
      return [
        {
          text: "THIS CERTIFIES further that their income is below poverty threshold level which could not meet the minimum basic needs of the family. He/she is eligible to avail the financial assistance grant from the government who is concerned to the plight of the indigent sector.\n\n",
        },
        "This CERTIFICATION is issued upon the request of the above-stated person for IMMERSION or any legal purposes that may serve her best.",
      ];

    case "First Time Job Seeker":
      return [
        "This further certify that the holder/bearer was informed of her rights, including the duties and responsibilities accorded by RA 11261 through the ",
        { text: " Oath of Undertaking ", bold: true },
        " he/she has signed and executed in the presence  of our Barangay Official, purposes that may serve him best.",
      ];

    case "FIT TO WORK":
      return [
        "This is to certify further that this person is FIT TO WORK. \n\n",
        "This certification is issued upon the request of the above stated person for any legal purpose that may serve her best. ",
      ];
  }
};
