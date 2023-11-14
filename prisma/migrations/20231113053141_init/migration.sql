-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "headequarters" TEXT NOT NULL,
    "year_founded" TEXT NOT NULL,
    "org_logo_url" TEXT,
    "organizationStatusId" INTEGER NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationStatus" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "OrganizationStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" SERIAL NOT NULL,
    "display_img_url" TEXT,
    "description" TEXT NOT NULL,
    "portfolio_price" INTEGER NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioAssets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "asking_price" INTEGER NOT NULL,
    "portfolioId" INTEGER,

    CONSTRAINT "PortfolioAssets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationInvestors" (
    "organizationId" INTEGER NOT NULL,
    "investorId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrganizationInvestors_pkey" PRIMARY KEY ("organizationId","investorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_about_key" ON "Organization"("about");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationStatus_status_key" ON "OrganizationStatus"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_name_key" ON "Investor"("name");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_organizationStatusId_fkey" FOREIGN KEY ("organizationStatusId") REFERENCES "OrganizationStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioAssets" ADD CONSTRAINT "PortfolioAssets_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationInvestors" ADD CONSTRAINT "OrganizationInvestors_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationInvestors" ADD CONSTRAINT "OrganizationInvestors_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
