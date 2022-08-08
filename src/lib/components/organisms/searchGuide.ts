export type Query = {
	query: string;
	examples: string[];
}

export type Category = {
	title: string;
	queries: Query[];
}

export type SearchGuide = Category[];

export const searchGuide: SearchGuide = [
	{
		title: "Greater / Less Relations",
		queries: [
			{
				query: `>n`,
				examples: [
					`[cats stars:>1000] matches repositories with the word "cats" that have more than 1000 stars.`
				]
			},
			{
				query: `>=n`,
				examples: [
					`[cats topics:>=5] matches repositories with the word "cats" that have 5 or more topics.`
				]
			},
			{
				query: `<n`,
				examples: [
					`[cats size:<10000] matches code with the word "cats" in files that are smaller than 10 KB.`
				]
			},
			{
				query: `<=n`,
				examples: [
					`[cats stars:<=50] matches repositories with the word "cats" that have 50 or fewer stars.`
				]
			}
		]
	},
	{
		title: "Range Relations",
		queries: [
			{
				query: `n..n`,
				examples: [
					`[cats stars:10..50] matches repositories with the word "cats" that have between 10 and 50 stars.`
				]
			},
			{
				query: `n..*`,
				examples: [
					`[cats stars:10..*] is equivalent to stars:>=10 and matches repositories with the word "cats" that have 10 or more stars.`
				]
			},
			{
				query: `*..n`,
				examples: [
					`[cats stars:*..10] is equivalent to stars:<=10 and matches repositories with the word "cats" that have 10 or fewer stars.`
				]
			}
		]
	},
	{
		title: "Dates",
		queries: [
			{
				"query": ">YYYY-MM-DD",
				"examples": [
					"[cats created:>2016-04-29] matches issues with the word \"cats\" that were created after April 29, 2016."
				]
			},
			{
				"query": ">=YYYY-MM-DD",
				"examples": [
					"[cats created:>=2017-04-01] matches issues with the word \"cats\" that were created on or after April 1, 2017."
				]
			},
			{
				"query": "<YYYY-MM-DD",
				"examples": [
					"[cats pushed:<2012-07-05] matches code with the word \"cats\" in repositories that were pushed to before July 5, 2012."
				]
			},
			{
				"query": "<=YYYY-MM-DD",
				"examples": [
					"[cats created:<=2012-07-04] matches issues with the word \"cats\" that were created on or before July 4, 2012."
				]
			},
			{
				"query": "YYYY-MM-DD..YYYY-MM-DD",
				"examples": [
					"cats pushed:2016-04-30..2016-07-04 matches repositories with the word \"cats\" that were pushed to between the end of April and July of 2016."
				]
			},
			{
				"query": "YYYY-MM-DD..*",
				"examples": [
					"[cats created:2012-04-30..*] matches issues created after April 30th, 2012 containing the word \"cats.\""
				]
			},
			{
				"query": "*..YYYY-MM-DD",
				"examples": [
					"[cats created:*..2012-07-04] matches issues created before July 4th, 2012 containing the word \"cats.\""
				]
			}
		]
	},
	{
		title: "Negation",
		queries: [
			{
				"query": "NOT",
				"examples": [
					`[hello NOT world] matches repositories that have the word "hello" but not the word "world."`
				]
			},
			{
				"query": "-QUALIFIER",
				"examples": [
					`[cats stars:>10 -language:javascript] matches repositories with the word "cats" that have more than 10 stars but are not written in JavaScript.`
				]
			}
		]
	},
	{
		title: "Usernames",
		queries: [
			{
				"query": "QUALIFIER:USERNAME",
				"examples": [
					`[author:nat] matches commits authored by @nat`
				]
			},
			{
				"query": "QUALIFIER:@me	",
				"examples": [
					`[is:issue assignee:@me] matches issues assigned to the person viewing the results`
				]
			}
		]
	},
	{
		title: "Resource Type",
		queries: [
			{
				"query": "type:pr",
				"examples": [
					"cat type:pr matches pull requests with the word \"cat.\""
				]
			},
			{
				"query": "type:issue",
				"examples": [
					"github commenter:defunkt type:issue matches issues that contain the word \"github,\" and have a comment by @defunkt."
				]
			},
			{
				"query": "is:pr",
				"examples": [
					"event is:pr matches pull requests with the word \"event.\""
				]
			},
			{
				"query": "is:issue",
				"examples": [
					"is:issue label:bug is:closed matches closed issues with the label \"bug.\""
				]
			}
		],
	},
	{
		title: "Title, Body, & Comments",
		queries: [
			{
				"query": "in:title",
				"examples": [
					"warning in:title matches issues with \"warning\" in their title."
				]
			},
			{
				"query": "in:body",
				"examples": [
					"error in:title,body matches issues with \"error\" in their title or body."
				]
			},
			{
				"query": "in:comments",
				"examples": [
					"shipit in:comments matches issues mentioning \"shipit\" in their comments."
				]
			}
		],
	},
    {
		title: "Organizations & Repos",
		queries: [
			{
				"query": "user:USERNAME",
				"examples": [
					"user:defunkt ubuntu matches issues with the word \"ubuntu\" from repositories owned by @defunkt."
				]
			},
			{
				"query": "org:ORGNAME",
				"examples": [
					"org:github matches issues in repositories owned by the GitHub organization."
				]
			},
			{
				"query": "repo:USERNAME/REPOSITORY",
				"examples": [
					"repo:mozilla/shumway created:<2012-03-01 matches issues from @mozilla's shumway project that were created before March 2012."
				]
			}
		],
	},
    {
		title: "Open or Closed State",
		queries: [
			{
				"query": "state:open",
				"examples": [
					"libraries state:open mentions:vmg matches open issues that mention @vmg with the word \"libraries.\""
				]
			},
			{
				"query": "state:closed",
				"examples": [
					"design state:closed in:body matches closed issues with the word \"design\" in the body."
				]
			},
			{
				"query": "is:open",
				"examples": [
					"performance is:open is:issue matches open issues with the word \"performance.\""
				]
			},
			{
				"query": "is:closed",
				"examples": [
					"android is:closed matches closed issues and pull requests with the word \"android.\""
				]
			}
		],
	},
    {
		title: "Reason for Closing",
		queries: [
			{
				"query": "reason:complete",
				"examples": [
					"libraries is:closed reason:complete matches issues with the word \"libraries\" that were closed as \"completed.\""
				]
			},
			{
				"query": "reason:\"not planned\"",
				"examples": [
					"libraries is:closed reason:\"not planned\" matches issues with the word \"libraries\" that were closed as \"not planned.\""
				]
			}
		],
	},
    {
		title: "Repo Visibility",
		queries: [
			{
				"query": "is:public",
				"examples": [
					"is:public matches issues and pull requests in public repositories."
				]
			},
			{
				"query": "is:private",
				"examples": [
					"is:private cupcake matches issues and pull requests that contain the word \"cupcake\" in private repositories you can access."
				]
			}
		],
	},
	{
		title: "Authors",
		queries: [
			{
				"query": "author:USERNAME",
				"examples": [
					"cool author:gjtorikian matches issues and pull requests with the word \"cool\" that were created by @gjtorikian.",
					"bootstrap in:body author:mdo matches issues written by @mdo that contain the word \"bootstrap\" in the body."
				]
			},
			{
				"query": "author:app/USERNAME",
				"examples": [
					"author:app/robot matches issues created by the integration account named \"robot.\""
				]
			}
		],
	},
	{
		title: "Assignee",
		queries: [
			{
				"query": "assignee:USERNAME",
				"examples": [
					"assignee:vmg repo:libgit2/libgit2 matches issues and pull requests in libgit2's project libgit2 that are assigned to @vmg."
				]
			}
		],
	},
	{
		title: "Mentions",
		queries: [
			{
				"query": "mentions:USERNAME",
				"examples": [
					"resque mentions:defunkt matches issues with the word \"resque\" that mention @defunkt."
				]
			}
		],
	},
	{
		title: "Teams & Team Mentions",
		queries: [
			{
				"query": "team:ORGNAME/TEAMNAME",
				"examples": [
					"team:jekyll/owners matches issues where the @jekyll/owners team is mentioned.",
					"team:myorg/ops is:open is:pr matches open pull requests where the @myorg/ops team is mentioned."
				]
			}
		],
	},
	{
		title: "Commenters",
		queries: [
			{
				"query": "commenter:USERNAME",
				"examples": [
					"github commenter:defunkt org:github matches issues in repositories owned by GitHub, that contain the word \"github,\" and have a comment by @defunkt."
				]
			}
		],
	},
	{
		title: "Involved Users",
		queries: [
			{
				"query": "involves:USERNAME",
				"examples": [
					"involves:defunkt involves:jlord matches issues either @defunkt or @jlord are involved in.",
					"NOT bootstrap in:body involves:mdo matches issues @mdo is involved in that do not contain the word \"bootstrap\" in the body."
				]
			}
		],
	},
	{
		title: "Linked Issues & PRs",
		queries: [
			{
				"query": "linked:pr",
				"examples": [
					"repo:desktop/desktop is:open linked:pr matches open issues in the desktop/desktop repository that are linked to a pull request by a closing reference."
				]
			},
			{
				"query": "linked:issue",
				"examples": [
					"repo:desktop/desktop is:closed linked:issue matches closed pull requests in the desktop/desktop repository that were linked to an issue that the pull request may have closed."
				]
			},
			{
				"query": "-linked:pr",
				"examples": [
					"repo:desktop/desktop is:open -linked:pr matches open issues in the desktop/desktop repository that are not linked to a pull request by a closing reference."
				]
			},
			{
				"query": "-linked:issue",
				"examples": [
					"repo:desktop/desktop is:open -linked:issue matches open pull requests in the desktop/desktop repository that are not linked to an issue that the pull request may close."
				]
			}
		],
	},
	{
		title: "Labels",
			queries: [
			{
				"query": "label:LABEL",
				"examples": [
					"label:\"help wanted\" language:ruby matches issues with the label \"help wanted\" that are in Ruby repositories.",
					"broken in:body -label:bug label:priority matches issues with the word \"broken\" in the body, that lack the label \"bug\", but do have the label \"priority.\"",
					"label:bug label:resolved matches issues with the labels \"bug\" and \"resolved.\"",
					"label:bug,resolved matches issues with the label \"bug\" or the label \"resolved.\""
				]
			}
		],
	},
	{
		title: "Milestones",
			queries: [
			{
				"query": "milestone:MILESTONE",
				"examples": [
					"milestone:\"overhaul\" matches issues that are in a milestone named \"overhaul.\"",
					"milestone:\"bug fix\" matches issues that are in a milestone named \"bug fix.\""
				]
			}
		],
	},
	{
		title: "Projects & Boards",
		queries: [
			{
				"query": "project:PROJECT_BOARD",
				"examples": [
					"project:github/57 matches issues owned by GitHub that are associated with the organization's project board 57."
				]
			},
			{
				"query": "project:REPOSITORY/PROJECT_BOARD",
				"examples": [
					"project:github/linguist/1 matches issues that are associated with project board 1 in @github's linguist repository."
				]
			}
		],
	},
	{
		title: "Commit Status",
		queries: [
			{
				"query": "status:pending",
				"examples": [
					"language:go status:pending matches pull requests opened into Go repositories where the status is pending."
				]
			},
			{
				"query": "status:success",
				"examples": [
					"is:open status:success finally in:body matches open pull requests with the word \"finally\" in the body with a successful status."
				]
			},
			{
				"query": "status:failure",
				"examples": [
					"created:2015-05-01..2015-05-30 status:failure matches pull requests opened on May 2015 with a failed status."
				]
			}
		],
	},
	{
		title: "Commit SHA",
		queries: [
			{
				"query": "SHA",
				"examples": [
					"e1109ab matches pull requests with a commit SHA that starts with e1109ab.",
					"0eff326d6213c is:merged matches merged pull requests with a commit SHA that starts with 0eff326d6213c."
				]
			}
		],
	},
	{
		title: "Branch Name",
		queries: [
			{
				"query": "head:HEAD_BRANCH",
				"examples": [
					"head:change is:closed is:unmerged matches pull requests opened from branch names beginning with the word \"change\" that are closed."
				]
			},
			{
				"query": "base:BASE_BRANCH",
				"examples": [
					"base:gh-pages matches pull requests that are being merged into the gh-pages branch."
				]
			}
		],
	},
	{
		title: "Language",
		queries: [
			{
				"query": "language:LANGUAGE",
				"examples": [
					"language:ruby state:open matches open issues that are in Ruby repositories."
				]
			}
		],
	},
	{
		title: "Comments",
		queries: [
			{
				"query": "comments:n",
				"examples": [
					"state:closed comments:>100 matches closed issues with more than 100 comments.",
					"comments:500..1000 matches issues with comments ranging from 500 to 1,000."
				]
			}
		],
	},
	{
		title: "Interactions",
		queries: [
			{
				"query": "interactions:n",
				"examples": [
					"interactions:>2000 matches pull requests or issues with more than 2000 interactions.",
					"interactions:500..1000 matches pull requests or issues with interactions ranging from 500 to 1,000."
				]
			}
		],
	},
	{
		title: "Reactions",
		queries: [
			{
				"query": "reactions:n",
				"examples": [
					"reactions:>1000 matches issues with more than 1000 reactions.",
					"reactions:500..1000 matches issues with reactions ranging from 500 to 1,000."
				]
			}
		],
	},
	{
		title: "Draft Status",
		queries: [
			{
				"query": "draft:true",
				"examples": [
					"draft:true matches draft pull requests."
				]
			},
			{
				"query": "draft:false",
				"examples": [
					"draft:false matches pull requests that are ready for review."
				]
			}
		],
	},
	{
		title: "Reviews & Reviewers",
		queries: [
			{
				"query": "review:none",
				"examples": [
					"type:pr review:none matches pull requests that have not been reviewed."
				]
			},
			{
				"query": "review:required",
				"examples": [
					"type:pr review:required matches pull requests that require a review before they can be merged."
				]
			},
			{
				"query": "review:approved",
				"examples": [
					"type:pr review:approved matches pull requests that a reviewer has approved."
				]
			},
			{
				"query": "review:changes_requested",
				"examples": [
					"type:pr review:changes_requested matches pull requests in which a reviewer has asked for changes."
				]
			},
			{
				"query": "reviewed-by:USERNAME",
				"examples": [
					"type:pr reviewed-by:gjtorikian matches pull requests reviewed by a particular person."
				]
			},
			{
				"query": "review-requested:USERNAME",
				"examples": [
					"type:pr review-requested:benbalter matches pull requests where a specific person is requested for review. Requested reviewers are no longer listed in the search results after they review a pull request. If the requested person is on a team that is requested for review, then review requests for that team will also appear in the search results."
				]
			},
			{
				"query": "user-review-requested:@me",
				"examples": [
					"type:pr user-review-requested:@me matches pull requests that you have directly been asked to review."
				]
			},
			{
				"query": "team-review-requested:TEAMNAME",
				"examples": [
					"type:pr team-review-requested:atom/design matches pull requests that have review requests from the team atom/design. Requested reviewers are no longer listed in the search results after they review a pull request."
				]
			}
		],
	},
	{
		title: "Created & Updated Date",
		queries: [
			{
				"query": "created:YYYY-MM-DD",
				"examples": [
					"language:c# created:<2011-01-01 state:open matches open issues that were created before 2011 in repositories written in C#."
				]
			},
			{
				"query": "updated:YYYY-MM-DD",
				"examples": [
					"weird in:body updated:>=2013-02-01 matches issues with the word \"weird\" in the body that were updated after February 2013."
				]
			}
		],
	},
	{
		title: "Closed Date",
		queries: [
			{
				"query": "closed:YYYY-MM-DD",
				"examples": [
					"language:swift closed:>2014-06-11 matches issues and pull requests in Swift that were closed after June 11, 2014.",
					"data in:body closed:<2012-10-01 matches issues and pull requests with the word \"data\" in the body that were closed before October 2012."
				]
			}
		],
	},
	{
		title: "Merged Date",
		queries: [
			{
				"query": "merged:YYYY-MM-DD",
				"examples": [
					"language:javascript merged:<2011-01-01 matches pull requests in JavaScript repositories that were merged before 2011.",
					"fast in:title language:ruby merged:>=2014-05-01 matches pull requests in Ruby with the word \"fast\" in the title that were merged after May 2014."
				]
			}
		],
	},
	{
		title: "Merge Status",
		queries: [
			{
				"query": "is:merged",
				"examples": [
					"bug is:pr is:merged matches merged pull requests with the word \"bug.\""
				]
			},
			{
				"query": "is:unmerged",
				"examples": [
					"error is:unmerged matches pull requests with the word \"error\" that are either open or were closed without being merged."
				]
			}
		],
	},
	{
		title: "Archived Status",
		queries: [
			{
				"query": "archived:true",
				"examples": [
					"archived:true GNOME matches issues and pull requests that contain the word \"GNOME\" in archived repositories you have access to."
				]
			},
			{
				"query": "archived:false",
				"examples": [
					"archived:false GNOME matches issues and pull requests that contain the word \"GNOME\" in unarchived repositories you have access to."
				]
			}
		],
	},
	{
		title: "Locked Conversations",
		queries: [
			{
				"query": "is:locked",
				"examples": [
					"code of conduct is:locked is:issue archived:false matches issues or pull requests with the words \"code of conduct\" that have a locked conversation in a repository that is not archived."
				]
			},
			{
				"query": "is:unlocked",
				"examples": [
					"code of conduct is:unlocked is:issue archived:false matches issues or pull requests with the words \"code of conduct\" that have an unlocked conversation in a repository that is not archived."
				]
			}
		],
	},
	{
		title: "Missing Metadata",
		queries: [
			{
				"query": "no:label",
				"examples": [
					"priority no:label matches issues and pull requests with the word \"priority\" that also don't have any labels."
				]
			},
			{
				"query": "no:milestone",
				"examples": [
					"sprint no:milestone type:issue matches issues not associated with a milestone containing the word \"sprint.\""
				]
			},
			{
				"query": "no:assignee",
				"examples": [
					"important no:assignee language:java type:issue matches issues not associated with an assignee, containing the word \"important,\" and in Java repositories."
				]
			},
			{
				"query": "no:project",
				"examples": [
					"build no:project matches issues not associated with a project board, containing the word \"build.\""
				]
			}
		]
	}
]
