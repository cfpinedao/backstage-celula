
+ import {
    +  azureDevOpsPullRequestReadPermission,
    +  azureDevOpsPipelineReadPermission,
    +  azureDevOpsGitTagReadPermission,
    +  azureDevOpsReadmeReadPermission,
    +  azureDevOpsPullRequestDashboardReadPermission } from '@backstage-community/plugin-azure-devops-common';
    + import {
    +  AuthorizeResult,
    +  PolicyDecision,
    +  isPermission,
    + } from '@backstage/plugin-permission-common';
    + import {
    +   catalogConditions,
    +   createCatalogConditionalDecision,
    + } from '@backstage/plugin-catalog-backend/alpha';
    ...
    async handle(
      request: PolicyQuery,
      user?: BackstageIdentityResponse,
    ): Promise<PolicyDecision> {
    + if ( isPermission(request.permission, azureDevOpsPullRequestReadPermission) ||
    +      isPermission(request.permission, azureDevOpsPipelineReadPermission) ||
    +      isPermission(request.permission, azureDevOpsGitTagReadPermission) ||
    +      isPermission(request.permission, azureDevOpsReadmeReadPermission)) {
    +    return createCatalogConditionalDecision(
    +      request.permission,
    +      catalogConditions.isEntityOwner({
    +          claims: user?.identity.ownershipEntityRefs ?? [],
    +       }),
    +    );
    +  }
    
    + if ( isPermission(request.permission, azureDevOpsPullRequestDashboardReadPermission) {
    + return {
    +   result: AuthorizeResult.ALLOW,
    +  };
    + }
    
      return {
        result: AuthorizeResult.ALLOW,
      };
    }